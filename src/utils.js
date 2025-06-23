/**
 * 节流函数
 * @param {Function} func 需要节流的函数
 * @param {number} delay 延迟时间，单位毫秒
 * @returns {Function} 返回一个新的节流函数
 */
export function throttle(func, delay) {
  let timer = null;
  let lastTime = 0;

  return function(...args) {
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
  const isObject = (obj) => !!obj && (obj.constructor === Object) && !(obj instanceof HTMLElement);

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
}
