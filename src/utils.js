import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeFormat from 'rehype-format';
import rehypeMermaid from 'rehype-mermaid';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import balanced from 'balanced-match';


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
      return `__CHERRY_STUDIO_PROTECTED_${index}__`
    })
    // 保护链接 [text](url)
    .replace(/\[([^[\]]*(?:\[[^\]]*\][^[\]]*)*)\]\([^)]*?\)/g, (match) => {
      const index = protectedItems.length
      protectedItems.push(match)
      return `__CHERRY_STUDIO_PROTECTED_${index}__`
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
  result = result.replace(/__CHERRY_STUDIO_PROTECTED_(\d+)__/g, (match, indexStr) => {
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
    .use(rehypeMermaid, {
      errorFallback: function (element, diagram, error, vfile) {
        return null;
      }
    })
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
  } catch(e) {
    backCopy();
  }
};

