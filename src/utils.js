import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeFormat from 'rehype-format';
import rehypeMermaid from 'rehype-mermaid';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import balanced from 'balanced-match';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

import copySvg from './assets/copy.svg?raw';
import copiedSvg from './assets/copied.svg?raw';
import eyeSvg from './assets/eye.svg?raw';
import codeSvg from './assets/code.svg?raw';
import dwnSvg from './assets/download.svg?raw';
import zoominSvg from './assets/zoomin.svg?raw';
import zoomoutSvg from './assets/zoomout.svg?raw';
import fullscreenSvg from './assets/fullscreen.svg?raw';
import fitViewportSvg from './assets/fit-viewport.svg?raw';

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



// 检查是否包含潜在的 LaTeX 模式
const containsLatexRegex = /\\\(.*?\\\)|\\\[.*?\\\]|\$.*?\$|\\begin\{equation\}.*?\\end\{equation\}/;

/**
 * 转换 LaTeX 公式括号 `\[\]` 和 `\(\)` 为 Markdown 格式 `$$...$$` 和 `$...$`
 *
 * remark-math 本身不支持 LaTeX 原生语法，作为替代的一些插件效果也不理想。
 *
 * 目前的实现：
 * - 保护代码块和链接，避免被 remark-math 处理
 * - 支持嵌套括号的平衡匹配
 * - 转义 `\\(x\\)` 会被处理为 `\$x\$`，`\\[x\\]` 会被处理为 `\$$x\$$`
 *
 * @see https://github.com/remarkjs/remark-math/issues/39
 * @param text 输入的 Markdown 文本
 * @returns 处理后的字符串
 */
export const processLatexBrackets = (text) => {
  // 没有 LaTeX 模式直接返回
  if (!containsLatexRegex.test(text)) {
    return text;
  }

  // 保护代码块和链接
  const protectedItems = [];
  let processedContent = text;

  processedContent = processedContent
    // 保护代码块（包括多行代码块和行内代码）
    .replace(/(```[\s\S]*?```|`[^`]*`)/g, (match) => {
      const index = protectedItems.length
      protectedItems.push(match)
      return `__AI_CHATBOT_PROTECTED_${index}__`
    })
    // 保护链接 [text](url)
    .replace(/\[([^[\]]*(?:\[[^\]]*\][^[\]]*)*)\]\([^)]*?\)/g, (match) => {
      const index = protectedItems.length
      protectedItems.push(match)
      return `__AI_CHATBOT_PROTECTED_${index}__`
    });

  // LaTeX 括号转换函数
  const processMath = (content, openDelim, closeDelim, wrapper) => {
    let result = '';
    let remaining = content;

    while (remaining.length > 0) {
      const match = balanced(openDelim, closeDelim, remaining);
      if (!match) {
        result += remaining;
        break;
      }

      result += match.pre;
      result += `${wrapper}${match.body}${wrapper}`;
      remaining = match.post;
    }

    return result;
  }

  // 先处理块级公式，再处理内联公式
  let result = processMath(processedContent, '\\[', '\\]', '$$');
  result = processMath(result, '\\(', '\\)', '$');

  // 还原被保护的内容
  result = result.replace(/__AI_CHATBOT_PROTECTED_(\d+)__/g, (match, indexStr) => {
    const index = parseInt(indexStr, 10);
    // 添加边界检查，防止数组越界
    if (index >= 0 && index < protectedItems.length) {
      return protectedItems[index];
    }
    // 如果索引无效，保持原始匹配
    return match;
  })

  return result;
};

/**
 * 转换数学公式格式：
 * - 将 LaTeX 格式的 '\\[' 和 '\\]' 转换为 '$$$$'。
 * - 将 LaTeX 格式的 '\\(' 和 '\\)' 转换为 '$$'。
 * @param {string} input 输入字符串
 * @returns {string} 转换后的字符串
 */
export function convertMathFormula(input) {
  if (!input) return input;

  let result = input;
  result = result.replaceAll('\\[', '$$$$').replaceAll('\\]', '$$$$');
  result = result.replaceAll('\\(', '$$').replaceAll('\\)', '$$');
  return result;
};


/**
 * 添加代码块复制按钮的 Rehype 插件
 */
function rehypeCodeCopyButton() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // 只处理 <pre> 标签下的 <code> 标签
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        //const codeNode = node.children[0];
        //const rawCodeText = codeNode.children.map(child => child.value).join('');

        const copyButton = h('button', {
          className: 'ai-chatbot-copy-button ai-chatbot-code-copy-button',
          //'data-code': rawCodeText,
          title: '复制'
        }, [
          h('span', { className: 'ai-chatbot-button-icon ai-chatbot-copy-icon' }, [{ type: 'raw', value: copySvg }]),
          h('span', { className: 'ai-chatbot-button-icon ai-chatbot-copied-icon' }, [{ type: 'raw', value: copiedSvg }]),
          h('span', { className: 'ai-chatbot-copied-text' }, "已复制")
        ]);

        const wrapper = h('div', {
          className: 'ai-chatbot-codeblock-wrapper',
          style: 'position: relative;'
        }, [
          node, // 原始的 <pre> 节点
          copyButton
        ]);

        parent.children.splice(index, 1, wrapper);
      }
    });
  };
}

/**
 * 添加 Mermaid 图表交互操作
 */
function rehypeMermaidButtons() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // 只处理 <pre> 标签下的 <code> 标签
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        const codeNode = node.children[0];
        if (!codeNode.properties?.className.includes('language-mermaid')) {
          return;
        }

        const rawCodeText = codeNode.children.map(child => child.value).join('');

        const previewButton = h('button', {
          className: 'ai-chatbot-mermaid-preview-button',
          title: '预览图表'
        }, [h('span', { className: 'ai-chatbot-button-icon' }, [{ type: 'raw', value: eyeSvg }])]);

        const sourceButton = h('button', {
          className: 'ai-chatbot-mermaid-source-button',
          title: '源码'
        }, [h('span', { className: 'ai-chatbot-button-icon' }, [{ type: 'raw', value: codeSvg }])]);

        const dwnButton = h('button', {
          className: 'ai-chatbot-mermaid-download-button',
          title: '下载图表'
        }, [h('span', { className: 'ai-chatbot-button-icon' }, [{ type: 'raw', value: dwnSvg }])]);

        const copyButton = h('button', {
          className: 'ai-chatbot-copy-button ai-chatbot-mermaid-copy-button',
          title: '复制源码'
        }, [
          h('span', { className: 'ai-chatbot-button-icon ai-chatbot-copy-icon' }, [{ type: 'raw', value: copySvg }]),
          h('span', { className: 'ai-chatbot-button-icon ai-chatbot-copied-icon' }, [{ type: 'raw', value: copiedSvg }])
        ]);

        const zoominButton = h('button', {
          className: 'ai-chatbot-mermaid-zoomin-button',
          title: '放大图表'
        }, [h('span', { className: 'ai-chatbot-button-icon' }, [{ type: 'raw', value: zoominSvg }])]);

        const zoomoutButton = h('button', {
          className: 'ai-chatbot-mermaid-zoomout-button',
          title: '缩小图表'
        }, [h('span', { className: 'ai-chatbot-button-icon' }, [{ type: 'raw', value: zoomoutSvg }])]);
        
        const fullscreenButton = h('button', {
          className: 'ai-chatbot-mermaid-fullscreen-button',
          title: '全屏显示'
        }, [h('span', { className: 'ai-chatbot-button-icon' }, [{ type: 'raw', value: fullscreenSvg }])]);
        
        const fitViewportButton = h('button', {
          className: 'ai-chatbot-mermaid-fit-viewport-button',
          title: '适应视口'
        }, [h('span', { className: 'ai-chatbot-button-icon' }, [{ type: 'raw', value: fitViewportSvg }])]);

        const toolbarLeft = h('div', {
          className: 'ai-chatbot-mermaid-toolbar-rl'
        }, [h('span', {}, 'Mermaid')]);

        const toolbarCenter = h('div', {
          className: 'ai-chatbot-mermaid-toolbar-rc'
        }, [h('div', {className:'ai-chatbot-button-group'}, [previewButton, sourceButton])]);

        const previewButtons = h('div', {
          className: 'ai-chatbot-button-group ai-chatbot-mermaid-preview-buttons'
        }, [dwnButton, zoomoutButton, zoominButton, fitViewportButton]);

        const sourceButtons = h('div', {
          className: 'ai-chatbot-button-group ai-chatbot-mermaid-source-buttons'
        }, [copyButton]);

        const toolbarRight = h('div', {
          className: 'ai-chatbot-mermaid-toolbar-rr'
        }, [previewButtons, sourceButtons, fullscreenButton]);

        const toolbar = h('div', {
          className: 'ai-chatbot-mermaid-toolbar'
        }, [toolbarLeft, toolbarCenter, toolbarRight]);

        const previewContainer = h('div', {
          className: 'ai-chatbot-mermaid-preview-container'
        }, [h('div', {
          className: 'ai-chatbot-mermaid-diagram'
        }, [node])]); // 原始的 <pre> 节点

        const sourceContainer = h('div', {
          className: 'ai-chatbot-mermaid-source-container'
        }, [h('pre', {}, rawCodeText)]);

        const mermaidContainer = h('div', {
          className: 'ai-chatbot-mermaid-container'
        }, [previewContainer, sourceContainer]);

        const wrapper = h('div', {
          className: 'ai-chatbot-mermaid-wrapper show-mermaid-preview'
        }, [toolbar, mermaidContainer]);

        parent.children.splice(index, 1, wrapper);
      }
    });
  };
}


// 注意插件位置顺序: 
// -markdown->+  (remark)  +-mdast->+ (remark plugins) +-mdast->+ (remark-rehype) +-hast->+ (rehype plugins) +-hast-> ...
// remarkMath 属于 remark 插件（处理 Markdown AST），
// 而 rehypeKatex 和 rehypeHighlight 属于 rehype 插件（处理 HTML AST）,
// remarkRehype 必须在 remarkMath 之后，且在 rehypeKatex 和 rehypeHighlight 之前
export const remarkProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true }) // 从 Markdown AST 转换到 HTML AST
  .use(rehypeKatex, {
    output: 'mathml', // html | mathml | htmlAndMathml
    throwOnError: false,
    strict: false
  })
  .use(rehypeMermaidButtons)
  .use(rehypeMermaid, {
    errorFallback: function (element, diagram, error, vfile) {
      console.error('mermaid渲染错误:', element, diagram, error, vfile);
      return element;
    }
  })
  .use(rehypeCodeCopyButton)
  .use(rehypeRaw) // 允许处理 hast 中的原始标签
  .use(rehypeHighlight)
  .use(rehypeFormat)
  .use(rehypeStringify);

export const renderMarkdown = (content, hostElement) => {
  if (!hostElement) {
    return;
  }

  remarkProcessor.process(processLatexBrackets(content))
    .then(html => hostElement.innerHTML = html)
    .catch((e) => hostElement.innerHTML = content);
};

/**
 * 从高亮的代码节点中提取原始代码文本,
 * 处理嵌套的代码块和文本节点，保留换行符
 * @param {HTMLElement} codeNode 
 * @returns 原始代码文本
 */
export function extractRawCodeFromHighlight(codeNode) {
  var text = '';
  codeNode.childNodes.forEach(function(child) {
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
    } catch(e) {
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

