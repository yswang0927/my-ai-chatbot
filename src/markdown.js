import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
//import rehypeMathjax from 'rehype-mathjax';
import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaid';
//import rehypeCallouts from 'rehype-callouts';
import rehypeVideo from 'rehype-video';
import { unified } from 'unified';
import balanced from 'balanced-match';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import {html, find, svg} from 'property-information';

import copySvg from './assets/copy.svg?raw';
import copiedSvg from './assets/copied.svg?raw';
import eyeSvg from './assets/eye.svg?raw';
import codeSvg from './assets/code.svg?raw';
import dwnSvg from './assets/download.svg?raw';
import zoominSvg from './assets/zoomin.svg?raw';
import zoomoutSvg from './assets/zoomout.svg?raw';
import fullscreenSvg from './assets/fullscreen.svg?raw';
import fitViewportSvg from './assets/fit-viewport.svg?raw';


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
          className: 'ai-chatbot-button ai-chatbot-copy-button ai-chatbot-code-copy-button',
          'data-variant': 'minimal',
          title: '复制'
        }, [
          h('span', { className: 'ai-chatbot-icon ai-chatbot-copy-icon' }, [{ type: 'raw', value: copySvg }]),
          h('span', { className: 'ai-chatbot-icon ai-chatbot-copied-icon' }, [{ type: 'raw', value: copiedSvg }]),
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
        if (!codeNode || !(codeNode.properties?.className?.includes('language-mermaid'))) {
          return;
        }

        const rawCodeText = codeNode.children.map(child => child.value).join('');

        const previewButton = h('button', {
          className: 'ai-chatbot-button ai-chatbot-mermaid-preview-button',
          title: '预览图表',
          'data-variant': 'minimal'
        }, [h('span', { className: 'ai-chatbot-icon' }, [{ type: 'raw', value: eyeSvg }])]);

        const sourceButton = h('button', {
          className: 'ai-chatbot-button ai-chatbot-mermaid-source-button',
          title: '源码',
          'data-variant': 'minimal'
        }, [h('span', { className: 'ai-chatbot-icon' }, [{ type: 'raw', value: codeSvg }])]);

        const dwnButton = h('button', {
          className: 'ai-chatbot-button ai-chatbot-mermaid-download-button',
          title: '下载图表',
          'data-variant': 'minimal'
        }, [h('span', { className: 'ai-chatbot-icon' }, [{ type: 'raw', value: dwnSvg }])]);

        const copyButton = h('button', {
          className: 'ai-chatbot-button ai-chatbot-copy-button ai-chatbot-mermaid-copy-button',
          title: '复制源码',
          'data-variant': 'minimal'
        }, [
          h('span', { className: 'ai-chatbot-icon ai-chatbot-copy-icon' }, [{ type: 'raw', value: copySvg }]),
          h('span', { className: 'ai-chatbot-icon ai-chatbot-copied-icon' }, [{ type: 'raw', value: copiedSvg }])
        ]);

        const zoominButton = h('button', {
          className: 'ai-chatbot-button ai-chatbot-mermaid-zoomin-button',
          title: '放大图表',
          'data-variant': 'minimal'
        }, [h('span', { className: 'ai-chatbot-icon' }, [{ type: 'raw', value: zoominSvg }])]);

        const zoomoutButton = h('button', {
          className: 'ai-chatbot-button ai-chatbot-mermaid-zoomout-button',
          title: '缩小图表',
          'data-variant': 'minimal'
        }, [h('span', { className: 'ai-chatbot-icon' }, [{ type: 'raw', value: zoomoutSvg }])]);

        const fullscreenButton = h('button', {
          className: 'ai-chatbot-button ai-chatbot-mermaid-fullscreen-button',
          title: '全屏显示',
          'data-variant': 'minimal'
        }, [h('span', { className: 'ai-chatbot-icon' }, [{ type: 'raw', value: fullscreenSvg }])]);

        const fitViewportButton = h('button', {
          className: 'ai-chatbot-button ai-chatbot-mermaid-fit-viewport-button',
          title: '适应视口',
          'data-variant': 'minimal'
        }, [h('span', { className: 'ai-chatbot-icon' }, [{ type: 'raw', value: fitViewportSvg }])]);

        const toolbarLeft = h('div', {
          className: 'ai-chatbot-mermaid-toolbar-rl'
        }, [h('span', {}, 'Mermaid')]);

        const toolbarCenter = h('div', {
          className: 'ai-chatbot-mermaid-toolbar-rc'
        }, [h('div', { className: 'ai-chatbot-button-group' }, [previewButton, sourceButton])]);

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
        }, [h('pre', { className: 'ai-chatbot-mermaid-source-pre' }, rawCodeText)]);

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


// 直接将 HAST 转换为 DOM 元素, 提高渲染速度
function hastToDom(hastNode, parentElement, namespace) {
  if (!hastNode || !parentElement) {
    return;
  }

  if (typeof hastNode === 'string') {
    const textNode = document.createTextNode(hastNode);
    parentElement.appendChild(textNode);
    return;
  }

  const children = hastNode.children;

  if (hastNode.type === 'root') {
    if (typeof children === 'string') {
      parentElement.appendChild(document.createTextNode(children));
    } else if (Array.isArray(children)) {
      children.forEach(child => hastToDom(child, parentElement, namespace));
    } else if (typeof children === 'object') {
      hastToDom(children, parentElement, namespace);
    }
    return;
  }

  const tagName = hastNode.tagName;

  if (hastNode.type === 'element' && tagName) {
    const props = hastNode.properties || {};
    let foundNamespace = namespace || props.xmlns || (tagName === 'svg' ? 'http://www.w3.org/2000/svg' : null);
    const isSvg = foundNamespace === 'http://www.w3.org/2000/svg' || tagName === 'svg';
    
    // svg-foreignObject的子元素使用HTML命名空间
    if (parentElement.tagName === 'foreignObject') {
      foundNamespace = 'http://www.w3.org/1999/xhtml'; // 确保HTML元素使用HTML命名空间
    }

    const el = foundNamespace 
      ? document.createElementNS(foundNamespace, tagName) 
      : document.createElement(tagName);

    const schema = isSvg ? svg : html;

    for (let key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const info = find(schema, key);
        let value = props[key];
  
        if (Array.isArray(value)) {
          value = value.join(info.commaSeparated ? ', ' : ' ');
        }
  
        if (info.mustUseProperty) {
          el[info.property] = value;
        }
  
        if (info.boolean || (info.overloadedBoolean && typeof value === 'boolean')) {
          if (value) {
            el.setAttribute(info.attribute, '');
          }
        } else if (info.booleanish) {
          el.setAttribute(info.attribute, String(value));
        } else if (value === true) {
          el.setAttribute(info.attribute, '');
        } else if (value || value === 0 || value === '') {
          el.setAttribute(info.attribute, String(value));
        }
      }
    }

    if (children) {
      if (typeof children === 'string') {
        el.appendChild(document.createTextNode(children));
      } else if (Array.isArray(children)) {
        children.forEach(child => hastToDom(child, el, foundNamespace));
      } else if (typeof children === 'object') {
        hastToDom(children, el, foundNamespace);
      }
    }

    parentElement.appendChild(el);
    return;
  }

  if (hastNode.type === 'text') {
    parentElement.appendChild(document.createTextNode(hastNode.value));
    return;
  }

  if (hastNode.type === 'raw') {
    let div = document.createElement('div');
    div.innerHTML = hastNode.value;
    const rawChildren = Array.from(div.childNodes);
    rawChildren.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        parentElement.appendChild(child);
      } else if (child.nodeType === Node.TEXT_NODE) {
        parentElement.appendChild(document.createTextNode(child.textContent));
      } else if (child.nodeType === Node.COMMENT_NODE) {
        parentElement.appendChild(document.createComment(child.textContent));
      }
    });
    return;
  }

  if (hastNode.type === 'comment') {
    parentElement.appendChild(document.createComment(hastNode.value));
    return;
  }

  console.warn(`Unhandled hast node type: ${hastNode.type}`);
}

// 直接DOM对象编译器
function rehypeDom() {
  this.compiler = function(tree) {
    let fragment = document.createDocumentFragment();
    hastToDom(Array.isArray(tree) ? {type: 'root', children: tree} : tree, fragment);
    return fragment;
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
  //.use(rehypeMathjax)
  .use(rehypeMermaidButtons)
  .use(rehypeMermaid, {
    strategy: 'inline-svg',
    errorFallback: function (element, diagram, error, vfile) {
      console.error('mermaid渲染错误:', element, error);
      return h('div', {
        className: 'ai-chatbot-mermaid-error'
      }, [element, h('pre', { style: 'color:red' }, error.message || '')]);
      
    }
  })
  .use(rehypeCodeCopyButton)
  .use(rehypeVideo, { details: false })
  //.use(rehypeCallouts, { theme: 'github' })
  .use(rehypeHighlight)
  .use(rehypeDom);

export const renderMarkdown = (content, callback) => {
  if (!callback) {
    return;
  }

  remarkProcessor.process(processLatexBrackets(content))
    .then(vfile => {
      callback(vfile.result);
    })
    .catch((e) => {
      console.error('remarkProcessor process error: ', e);
      callback(content);
    });
};