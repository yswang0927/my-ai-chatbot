// 判断对象是否是{}对象
export const isPlainObject = (obj) => {
  return !!obj && (obj.constructor === Object);
};

/**
 * 节流函数
 * @param {Function} func 需要节流的函数
 * @param {number} delay 延迟时间，单位毫秒
 * @returns {Function} 返回一个新的节流函数
 */
export function throttle(func, delay) {
  let timer = null;
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastTime);
    clearTimeout(timer);
    if (remaining <= 0) {
      lastTime = now;
      func.apply(this, args);
    } else {
      timer = setTimeout(() => {
        lastTime = Date.now();
        func.apply(this, args);
      }, remaining);
    }
  };
}

/**
 * 深度合并
 */
export function deepMerge(target, source) {
  const isObject = (obj) => !!obj && (obj.constructor === Object);

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
};

// 生成UUID值
export function uuid() {
  let timestamp = new Date().getTime();
  let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (perforNow + random) % 16 | 0;
      perforNow = Math.floor(perforNow / 16);
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}

// 复制到剪贴板
export function copyToClipboard(text, callback) {
  const backCopy = () => {
    const element = document.createElement('textarea');
    const previouslyFocusedElement = document.activeElement;
    element.value = text;
    element.setAttribute('readonly', '');
    element.style.contain = 'strict';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.fontSize = '12pt';

    const selection = document.getSelection();
    const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;

    document.body.appendChild(element);
    element.select();

    // Explicit selection workaround for iOS
    element.selectionStart = 0;
    element.selectionEnd = text.length;

    document.execCommand('copy');
    document.body.removeChild(element);

    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  try {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (typeof callback === 'function') {
          callback();
        }
      })
      .catch(() => {
        backCopy();
      });
  } catch (e) {
    backCopy();
  }
};

// 简单实现监听数组的增删操作
// 建议使用: `watchArray()` 替代
export function simpleWatchArray(arr, callback) {
  const originalProto = Array.prototype;
  const newProto = Object.create(originalProto);
  
  // 劫持数组原型方法
  const arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
  
  arrayMethods.forEach(method => {
    newProto[method] = function(...args) {
      const result = originalProto[method].apply(this, args);
      callback(this);
      return result;
    };
  });

  Object.setPrototypeOf(arr, newProto);
};

/**
 * 使用ES6-Proxy实现监听数组的增删改操作.
 * const arr = watchArray([], (arr:[], changes:[{type:'add|update|delete|...', index, oldValue, value}]) => {
 *   console.log('变化后的数组:', arr, '变更记录:', changes);
 * });
 * 
 * arr.push(1,2,3);
 * arr[2] = 22;
 * arr.splice(1,1);
 * arr.length = 0;
 */
const observerToProxyMap = new WeakMap(); // 存储: 原始数组 -> 代理数组
const observerToRawMap = new WeakMap(); // 存储: 代理数组 -> 原始数组
// 定义需要劫持的数组变异方法
const arrayMutationMethods = [ 'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse' ];
export function watchArray(array, callback) {
  // 避免重复代理
  if (observerToRawMap.has(array)) {
    return array;
  }
  if (observerToProxyMap.has(array)) {
    return observerToProxyMap.get(array);
  }

  if (!Array.isArray(array)) {
    return array;
  }

  if (typeof callback !== 'function') {
    return new Proxy(array, {
      set(target, property, value, receiver) {
        return Reflect.set(target, property, value, receiver);
      },
      deleteProperty(target, property) {
        return Reflect.deleteProperty(target, property);
      }
    });
  }

  let pendingUpdate = false;
  let changes = []; //收集本次批处理周期内的所有变更记录

  function scheduleUpdate(target) {
    if (!pendingUpdate) {
      pendingUpdate = true;
      Promise.resolve().then(() => {
        pendingUpdate = false;
        const currentChanges = [...changes];
        changes = [];
        callback(target, currentChanges);
      });
    }
  }

  const proxyHandler = {
    get(target, property, receiver) {
      // 如果访问的是需要劫持的数组变异方法
      if (arrayMutationMethods.includes(property)) {
        const originalMethod = target[property];
        // 返回一个封装后的方法
        return function (...args) {
          let result;
          let oldLength = target.length;
          let removedItems = []; // 用于 splice, pop, shift
          
          switch (property) {
            case 'push':
            case 'unshift':
              // push 和 unshift 会在末尾/开头添加元素
              // 在执行前，我们不知道新元素的最终索引，但知道它们是添加操作
              args.forEach((item, i) => {
                // 实际索引会在原生方法执行后确定，这里先记录为添加
                // 准确的索引可以在回调中根据数组新状态推断，或这里暂时用占位符
                changes.push({ type: 'add', value: item });
              });
              result = Reflect.apply(originalMethod, target, args);
              break;
            case 'pop':
            case 'shift':
              // pop 和 shift 会删除元素，我们需要在删除前获取被删除的元素
              const removedIndex = property === 'pop' ? oldLength - 1 : 0;
              const removedItem = target[removedIndex];
              result = Reflect.apply(originalMethod, target, args);
              if (removedItem !== undefined) {
                changes.push({ type: 'delete', index: removedIndex, oldValue: removedItem });
              }
              break;
            case 'splice':
              // splice 是最复杂的，它可能删除、添加、移动
              const start = args[0];
              const deleteCount = args[1];
              const itemsToAdd = args.slice(2);

              // 在执行原生 splice 前，获取将被删除的元素
              removedItems = Reflect.apply(target.slice, target, [start, start + deleteCount]);
              result = Reflect.apply(originalMethod, target, args);

              // 记录 splice 操作的整体变更
              if (itemsToAdd.length > 0) {
                itemsToAdd.forEach(item => {
                  changes.push({type: 'add', value: item});
                });
              }

              if (removedItems.length > 0) {
                removedItems.forEach((item, i) => {
                  changes.push({type: 'delete', index: (start + i), oldValue: item});
                });
              }

              /*changes.push({
                type: 'splice',
                index: start,
                deleteCount: deleteCount,
                itemsToAdd: itemsToAdd,
                removedItems: removedItems,
                newLength: target.length,
                oldLength: oldLength
              });*/
              break;
            case 'sort':
            case 'reverse':
              result = Reflect.apply(originalMethod, target, args);
              changes.push({ type: 'reorder' });
              break;
            default:
              result = Reflect.apply(originalMethod, target, args);
              break;
          }
          scheduleUpdate(target);
          return result;
        };
      }

      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      const hadProperty = Object.prototype.hasOwnProperty.call(target, property);
      const oldValue = target[property];
      const isNumericIndex = Number.isInteger(Number(property));
      const result = Reflect.set(target, property, value, receiver);

      if (isNumericIndex) {
        if (!hadProperty) {
          changes.push({ type: 'add', index: Number(property), value: value });
        } else if (value !== oldValue) {
          changes.push({ type: 'update', index: Number(property), oldValue: oldValue, value: value });
        }

      } else if (property === 'length') {
        if (value !== oldValue) {
          changes.push({ type: 'length', oldValue: oldValue, value: value });
        }

      } else {
        if (!hadProperty) {
          changes.push({ type: 'add_attr', property: String(property), value: value });
        } else if (value !== oldValue) {
          changes.push({ type: 'update_attr', property: String(property), oldValue: oldValue, value: value });
        }
      }

      if (changes.length > 0) {
        scheduleUpdate(target);
      }

      return result;
    },
    deleteProperty(target, property) {
      const hadProperty = Object.prototype.hasOwnProperty.call(target, property);
      const oldValue = target[property];
      const result = Reflect.deleteProperty(target, property);

      if (result && hadProperty) {
        if (Number.isInteger(Number(property))) {
          changes.push({ type: 'delete', index: Number(property), oldValue: oldValue });
        } else {
          changes.push({ type: 'delete_attr', property: String(property), oldValue: oldValue });
        }
        scheduleUpdate(target);
      }

      return result;
    }
  };

  const observedArray = new Proxy(array, proxyHandler);

  observerToProxyMap.set(array, observedArray);
  observerToRawMap.set(observedArray, array);

  return observedArray;
}


/**
 * 从高亮的代码节点中提取原始代码文本,
 * 处理嵌套的代码块和文本节点，保留换行符
 * @param {HTMLElement} codeNode 
 * @returns 原始代码文本
 */
export function extractRawCodeFromHighlight(codeNode) {
  var text = '';
  codeNode.childNodes.forEach(function (child) {
    if (child.nodeType === Node.TEXT_NODE) {
      text += child.textContent;
    } else if (child.nodeName === 'BR') {
      text += '\n';
    } else {
      text += extractRawCodeFromHighlight(child);
    }
  });
  return text;
}


/**
 * 下载 SVG 图像
 */
export function downloadSvg(svgCode, format) {
  const namePrefix = `mermaid-diagram-${new Date().toISOString().replace(/-/g, "").slice(0, 8)}`;
  if ('png' === format) {
    //const svgString = new XMLSerializer().serializeToString(svgElement);
    let svgEle;
    try {
      svgEle = new DOMParser().parseFromString(svgCode, "text/xml").querySelector("svg");
    } catch (e) {
      console.error('DOMParser failed to parse mermaid-svg-code: ', e);
      return;
    }
    if (!svgEle) {
      console.error('DOMParser failed to parse mermaid-svg-code');
      return;
    }

    const svgW = svgEle.viewBox.baseVal.width,
      svgH = svgEle.viewBox.baseVal.height;

    const canvas = document.createElement("canvas");
    canvas.width = 3 * svgW,
      canvas.height = 3 * svgH,
      canvas.style.width = svgW + 'px',
      canvas.style.height = svgH + 'px';
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error('no svg-convas-context2d');
      return;
    }
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((d) => {
        if (!d) {
          return;
        }
        const url = URL.createObjectURL(d);
        const a = document.createElement("a");
        a.href = url;
        a.download = namePrefix + '.png';
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    });
    const base64String = window.btoa(unescape(encodeURIComponent(svgCode)));
    const svgBase64 = `data:image/svg+xml;base64,${base64String}`;
    img.src = svgBase64;
    return;
  }
  else if ('svg' === format) {
    // download as svg
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = namePrefix + '.svg';
    a.click();
    URL.revokeObjectURL(url);
  }

}

