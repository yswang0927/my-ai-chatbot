import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
//import hljs from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import groovy from 'highlight.js/lib/languages/groovy';
import xml from 'highlight.js/lib/languages/xml';
import sql from 'highlight.js/lib/languages/sql';
import json from 'highlight.js/lib/languages/json';
import shell from 'highlight.js/lib/languages/shell';
import bash from 'highlight.js/lib/languages/bash';
import plaintext from 'highlight.js/lib/languages/plaintext';

import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { throttle, deepMerge } from './utils';

//import 'highlight.js/styles/github.css';
//import './style.css';

import highlightStyle from 'highlight.js/styles/github.css?raw';
import chatbotStyle from './style.css?raw';

import botIcon from './assets/bot.svg?raw';
import sendIcon from './assets/send.svg?raw';
import abortIcon from './assets/abort.svg?raw';
import arrowRight from './assets/arrow-right.svg?raw';
import plusIcon from './assets/plus.svg?raw';
import closeIcon from './assets/close.svg?raw';


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('json', json);
hljs.registerLanguage('groovy', groovy);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('plaintext', plaintext);


export class AIChatbot {
    constructor(options) {
        this.options = deepMerge({
            container: document.body,
            tools: [], // [{icon, label}]
            onToolsClick: (tool, chatbot, event) => {},
            openai: {
                url: '',
                apiKey: '',
                model: '',
                systemPrompt: ''
            },
            header: {
                botIcon: `${botIcon}`,
                botTitle: 'AI助手',
                closable: true,
                onClose: function() {}
            },
            theme: 'light',
            style: {
                '--primary-brand-color': '#5350c4'
            }
        }, options || {});

        let container = this.options.container;
        if (!container) {
            throw new Error('`container` not found');
        }
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        if (!container) {
            throw new Error('`container` not found');
        }

        let chatbotHeader = '';
        if (typeof this.options.header === 'object') {
            const { botIcon, botTitle } = this.options.header;
            chatbotHeader = `
            <div class="ai-chatbot-header">
                <div>
                    <span class="ai-chatbot-header-icon">${botIcon}</span>
                    <span class="ai-chatbot-header-title">${botTitle}</span>
                </div>
                <div class="ai-chatbot-header-actions">
                    <button class="ai-chatbot-action-new">${plusIcon}</button>
                    <button class="ai-chatbot-action-close">${closeIcon}</button>
                </div>
            </div>
            `;
        }

        const shadowContainer = container.attachShadow({ mode: "open" });

        shadowContainer.innerHTML = `
        <style>
        :host {
            height:100%;
            display:block;
            --primary-brand-color: ${this.options.style['--primary-brand-color']};
        }
        ${highlightStyle}
        ${chatbotStyle}
        </style>
        <div class="ai-chatbot">
            ${chatbotHeader}
            <div class="ai-chatbot-messages"></div>
            <div class="ai-chatbot-suggestion">
                <div class="ai-chatbot-suggestion-tools"></div>
                <div class="ai-chatbot-input-group">
                    <textarea class="ai-chatbot-user-input" name="ai-chatbot-user-input" rows="1" cols="10" placeholder="有什么问题尽管问我"></textarea>
                    <div class="ai-chatbot-input-actions">
                        <button class="ai-chatbot-send-btn">${sendIcon}</button>
                        <button class="ai-chatbot-abort-btn ai-chatbot-hide">${abortIcon}</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.messages = [];
        this._loading = false;
        this._abortController = null;
        this._autoScrolling = true;

        this.messageContainer = shadowContainer.querySelector('.ai-chatbot-messages');
        this.userInput = shadowContainer.querySelector('textarea.ai-chatbot-user-input');
        this.sendButton = shadowContainer.querySelector('button.ai-chatbot-send-btn');
        this.abortButton = shadowContainer.querySelector('button.ai-chatbot-abort-btn');
        this.toolsContainer = shadowContainer.querySelector('.ai-chatbot-suggestion-tools');
        this.actionNewSession = shadowContainer.querySelector('button.ai-chatbot-action-new');
        this.actionClose = shadowContainer.querySelector('button.ai-chatbot-action-close');
        
        this.setupEventListeners();
        this.setupMarkdown();
        this.setupTools();
    }
    
    setupEventListeners() {
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage(this.userInput.value.trim());
            }
        });
        
        this.userInput.addEventListener('input', () => {
            this.userInput.style.height = 'auto';
            let sh = this.userInput.scrollHeight;
            if (sh > 200) {
                sh = 200;
            }
            this.userInput.style.height = sh + 'px';
        });

        this.sendButton.addEventListener('click', () => this.sendMessage(this.userInput.value.trim()));
        this.abortButton.addEventListener('click', () => this.abortChat());

        if (this.actionNewSession) {
            this.actionNewSession.addEventListener('click', () => this.newSession());
        }
        if (this.actionClose) {
            this.actionClose.addEventListener('click', (e) => {
                if (typeof this.options.header?.onClose === 'function') {
                    this.options.header.onClose(this, e);
                }
            });
        }


        // 允许用户手工滚动
        const scrollArea = this.messageContainer;
        scrollArea.addEventListener('scroll', () => {
            const isAtBottom = (scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight) <= 10;
            // 用户向上滚动了 -> 停止自动滚动
            if (this._autoScrolling && !isAtBottom) {
                this._autoScrolling = false;
            } 
            // 如果用户又回到了底部，可以重新开启自动滚动
            else if (!this._autoScrolling && isAtBottom) {
                this._autoScrolling = true;
                this.scrollToBottom();
            }
        });
    }
    
    setupMarkdown() {
        this.marked = new Marked(markedHighlight({
            emptyLangClass: 'hljs',
            langPrefix: 'hljs language-',
            highlight(code, lang, info) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            }
        }));
    }

    setupTools() {
        const tools = this.options.tools;
        const onToolsClick = this.options.onToolsClick || function(){};
        if (!tools || tools.length === 0) {
            return;
        }
        
        tools.forEach(item => {
            let btn = document.createElement('button');
            btn.innerHTML = (item.icon ? '<span class="ai-tool-icon">'+ item.icon +'</span>':'') 
                + '<span class="ai-tool-text">'+ (item.label || 'Btn') +'</span>';
            btn.addEventListener('click', (e) => {
                onToolsClick(item, this, e);
            });
            this.toolsContainer.appendChild(btn);
        });
    }
    
    newSession() {
        this.abortChat();
        this.messages = [];
        this.messageContainer.innerHTML = '';
    }

    get loading() {
        return this._loading;
    }
    set loading(isLoading) {
        this._loading = !!isLoading;
        if (this._loading) {
            this.sendButton.classList.add('ai-chatbot-hide');
            this.abortButton.classList.remove('ai-chatbot-hide');
        } else {
            this.abortButton.classList.add('ai-chatbot-hide');
            this.sendButton.classList.remove('ai-chatbot-hide');
        }
    }
    
    addMessage(content, isUser=false, waiting=false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-chatbot-message-item ${isUser ? 'ai-chatbot-user-message' : 'ai-chatbot-assistant-message'}`;
        
        if (waiting) {
            messageDiv.innerHTML = `<div class="ai-chatbot-avatar">${botIcon}</div>
            <div class="ai-chatbot-message">
                <div class="ai-chatbot-message-thinking ai-chatbot-hide">
                    <div class="ai-chatbot-message-thinking-header">
                        <span class="ai-chatbot-message-thinking-tip"></span>
                        <span class="ai-chatbot-message-thinking-icon">${arrowRight}</span>
                    </div>
                    <div class="ai-chatbot-message-thinking-content"></div>
                </div>
                <div class="ai-chatbot-message-content">
                    <div class="ai-chatbot-waiting-indicator">
                        <div class="ai-chatbot-waiting-dot"></div>
                        <div class="ai-chatbot-waiting-dot"></div>
                        <div class="ai-chatbot-waiting-dot"></div>
                    </div>
                </div>
            </div>`;
        } else {
            if (isUser) {
                messageDiv.innerHTML = `<div class="ai-chatbot-message"><div class="ai-chatbot-message-content">${content}</div></div>`;
            } else {
                messageDiv.innerHTML = `<div class="ai-chatbot-avatar">${botIcon}</div>
                <div class="ai-chatbot-message">
                    <div class="ai-chatbot-message-thinking collapsed">
                        <div class="ai-chatbot-message-thinking-header">
                            <span class="ai-chatbot-message-thinking-tip"></span>
                            <span class="ai-chatbot-message-thinking-icon">${arrowRight}</span>
                        </div>
                        <div class="ai-chatbot-message-thinking-content"></div>
                    </div>
                    <div class="ai-chatbot-message-content">${this.marked.parse(content)}</div>
                </div>`;
            }
        }
        
        this.messageContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        if (!this._autoScrolling) {
            return;
        }
        requestAnimationFrame(() => {
          this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        });
    }

    abortChat() {
        if (this._abortController) {
            this._abortController.abort();
            this._abortController = null;
        }
    }

    setOpenai(options) {
        Object.assign(this.options.openai, options || {});
    }

    /**
     * 发送用户消息
     * @param {string} userMsg 用户消息
     * @param {string} sendMsg 【可选】实际发送给LLM的消息内容，默认=userMsg
     */
    async sendMessage(userMsg, sendMsg) {
        if (this.loading) {
            return;
        }

        const openai = this.options.openai;
        const apiUrl = openai?.url;
        const apiKey = openai?.apiKey;
        const model = openai?.model;
        if (!apiUrl) {
            throw new Error('`openai url` is required.');
        }
        if (!model) {
            throw new Error('`openai model` is required.');
        }

        if (!userMsg) {
            return;
        }
        
        this.loading = true;

        // 显示用户消息气泡
        this.addMessage(userMsg, true, false);
        this.messages.push({ role: 'user', content: sendMsg || userMsg });
        
        this.userInput.value = '';
        this.userInput.style.height = 'auto';
        
        // 立刻显示AI请求中提示气泡
        this.addMessage('', false, true);

        // 获取将要显示内容的元素
        let thinkingEle = null;
        let thinkingTipEle = null;
        let thinkingContentEle = null;
        let mainContentEle = null;
        const lastMessageEle = this.messageContainer.lastElementChild;
        if (lastMessageEle && lastMessageEle.classList.contains('ai-chatbot-message-item')) {
            thinkingEle = lastMessageEle.querySelector('.ai-chatbot-message-thinking');
            thinkingTipEle = lastMessageEle.querySelector('.ai-chatbot-message-thinking-tip');
            thinkingContentEle = lastMessageEle.querySelector('.ai-chatbot-message-thinking-content');
            mainContentEle = lastMessageEle.querySelector('.ai-chatbot-message-content');
            if (thinkingEle) {
                let thinkingHeader = lastMessageEle.querySelector('.ai-chatbot-message-thinking-header');
                thinkingHeader.addEventListener('click', () => {
                    thinkingHeader.parentElement.classList.toggle('collapsed');
                });
            }
        }

        const renderThinking = throttle((content, end, cost) => {
            if (!thinkingEle) return;
            thinkingEle.classList.remove('ai-chatbot-hide');
            thinkingTipEle.innerText = end ? `已思考 ${cost}秒` : `思考中(${cost}秒)...`;
            thinkingContentEle.innerHTML = this.marked.parse(content);
            if (end) {
                thinkingEle.classList.add('collapsed');
            }
            this.scrollToBottom();
        }, 150);

        const renderMainContent = throttle((content) => {
            if (!mainContentEle) return;
            mainContentEle.innerHTML = this.marked.parse(content);
            this.scrollToBottom();
        }, 150);
        

        const systemPrompt = openai?.systemPrompt || '';
        const requestBody = {
            model: model,
            messages: systemPrompt ? [{role:'system', content: systemPrompt}].concat(this.messages) : this.messages,
            stream: true
        };

        this._abortController = new AbortController();
        const abortSignal = this._abortController.signal;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify(requestBody),
                signal: abortSignal
            });

            if (!response.ok) {
                this.loading = false;
                console.error('Error from OpenAI API:', response);
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let hasReasoning = false;
            let inThinking = false;
            let thinkingEnd = false;
            let thinkingText = '';
            let thinkingStime = Date.now();
            let mainText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n\n');
                buffer = lines.pop(); // Keep incomplete line

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.substring(6);
                        if (data.trim() === '[DONE]') {
                            this.messages.push({role: 'assistant', content: mainText});
                            this.loading = false;
                            return;
                        }

                        try {
                            const json = JSON.parse(data);
                            const delta = json.choices[0].delta;

                            let reasoningContent = delta?.reasoning_content  || delta?.reasoning;
                            let content = delta?.content || '';

                            if (!hasReasoning && reasoningContent !== undefined) {
                                hasReasoning = true;
                            }
                            if (!hasReasoning && !content) {
                                continue;
                            }
                            // 碰到思考输出
                            // 处理 <think> 标签
                            if (hasReasoning || content.includes('<think>')) {
                                inThinking = true;
                                content = (reasoningContent || content).replace('<think>', '');
                            }
                            if (content.includes('</think>')) {
                                content = content.replace('</think>', '');
                                inThinking = false;
                                thinkingEnd = true;
                            }
                            if (hasReasoning && inThinking && delta?.content) {
                                inThinking = false;
                                thinkingEnd = true;
                            }

                            // 如果在思考块内
                            if (inThinking) {
                                if (content.length === 0) {
                                    continue;
                                }
                                // <think>后的第一个换行符忽略
                                if (content === '\n' && thinkingText.length === 0) {
                                    continue;
                                }
                                thinkingText += content;
                                renderThinking(thinkingText, thinkingEnd, ((Date.now() - thinkingStime)/1000).toFixed(1));
                                continue;
                            }
                            
                            if (!inThinking) {
                                // 更新前面最后一次的think
                                if (thinkingText.length > 0) {
                                    renderThinking(thinkingText, thinkingEnd, ((Date.now() - thinkingStime)/1000).toFixed(1));
                                    thinkingText = '';
                                }
                                // 累加主内容
                                mainText += content;
                                renderMainContent(mainText);
                            }

                        } catch (error) {
                            console.error('响应内容不是json格式', error);
                        }
                    }
                }
            }

        } catch (error) {
            this.loading = false;
            if (!(error.message.includes('abort'))) {
                console.error('Error:', error);
                this.addMessage('发生了异常错误：'+ (error.message || 'unknown'));
            }
        }

    }
}


/**
 * 自定义浮动助手元素
 */
class AIChatbotFloatingAssistant extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this._config = {};
    }
    // 生命周期钩子：元素被添加到DOM时调用
    connectedCallback() {
        const icon = this.config.icon;

        this.shadowRoot.innerHTML = `
        <style>
        .ai-chatbot-floating-handler {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            appearance: none;
            background-color: var(--primary-brand-color);
            color: #fff;
            border: 0 none;
            cursor: pointer;
            user-select: none;
            touch-action: none;
            outline: none;
            transition: box-shadow 0.2s;
            box-shadow: 0 2px 6px rgba(17, 20, 24, .2);
        }
        .ai-chatbot-floating-handler svg {
            fill: currentColor;
            pointer-events: none;
        }
        .ai-chatbot-floating-handler:hover {
            box-shadow: 0 8px 16px rgba(17, 20, 24, .2);
        }
        .ai-chatbot-floating-handler.is-dragging {
            cursor: grabbing;
        }
        </style>
        <div style="position:relative;">
            <button class="ai-chatbot-floating-handler">${icon}</button>
        </div>
        `;

        this.handlerBtn = this.shadowRoot.querySelector('button.ai-chatbot-floating-handler');
    }
    set config(options) {
        this._config = options;
    }
    get config() {
        return this._config;
    }
}

customElements.define('ai-chatbot-floating-assistant', AIChatbotFloatingAssistant);

/**
 * 浮动助手
 */
export const floatingAssistant = (options) => {
    if (document.getElementById('ai-chatbot-floating-assistant')) {
        return;
    }

    const opts = deepMerge({
        icon: `${botIcon}`,
        theme: 'light',
        style: {
            right: "30px",
            bottom: "30px",
            zIndex: 1000,
            '--primary-brand-color': '#5350c4'
        }
    }, options || {});

    const baseZindex = parseInt(opts.style?.zIndex || 1000);

    const handler = document.createElement('ai-chatbot-floating-assistant');
    handler.style.cssText = 'position:fixed;right:10px;bottom:10px;transform:translate(0, 0);cursor:pointer;';
    handler.config = opts;
    handler.id = 'ai-chatbot-floating-assistant';
    handler.className = 'ai-chatbot-floating-assistant';
    document.body.appendChild(handler);
    if (opts.style) {
        for (let key in opts.style) {
            let val = opts.style[key];
            if (val === null || val === undefined) {
                continue;
            }
            handler.style.setProperty(key, val);
        }
    }

    const chatbotFloatingContainer = document.createElement('div');
    chatbotFloatingContainer.className = 'ai-chatbot-floating-container';
    chatbotFloatingContainer.style.cssText = `display:none;position:fixed;z-index:${baseZindex+2};left:0;top:0;width:400px;height:80vh;border:1px solid #d9d9d9;border-radius:6px;background-color:#f6f8f9;`;
    document.body.appendChild(chatbotFloatingContainer);
    const chatbot = new AIChatbot(Object.assign({}, opts, {
        container: chatbotFloatingContainer,
        header: {
            onClose: () => {
                chatbotFloatingContainer.style.display = 'none';
            }
        }
    }));

    // 用于覆盖页面上可能存在的iframe等会捕获鼠标的元素,避免拖动卡顿
    const floatingOverlay = document.createElement('div');
    floatingOverlay.className = 'ai-chatbot-floating-overlay';
    floatingOverlay.style.cssText = `display:none;position:fixed;left:0;top:0;right:0;bottom:0;z-index:${baseZindex-1};use-select:none;background-color:rgba(0,0,0,0);`;
    document.body.appendChild(floatingOverlay);

    const handleClick = () => {
        const rect = handler.getBoundingClientRect();
        const disTop = rect.top;
        const disBtm = window.innerHeight - rect.top - rect.height;
        chatbotFloatingContainer.style.height = (Math.max(disTop, disBtm) - 30) + 'px';

        if (chatbotFloatingContainer.style.display === 'block') {
            chatbotFloatingContainer.style.display = 'none';
            return;
        }

        // 使用 floating-ui/dom 来自动计算位置
        chatbotFloatingContainer.style.display = 'block';
        chatbotFloatingContainer.style.visibility = 'hidden';
        computePosition(handler, chatbotFloatingContainer, {
            placement: 'top-end',
            middleware: [flip(), shift(), offset(5)]
        }).then(({ x, y }) => {
            Object.assign(chatbotFloatingContainer.style, {
                left: `${x}px`,
                top: `${y}px`,
                visibility: 'visible'
            });
        });
    };

    // 增加拖动功能
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;

    const getEventCoords = (e) => e.touches ? e.touches[0] : e;

    const onDragStart = (e) => {
        const coords = getEventCoords(e);
        initialX = coords.clientX;
        initialY = coords.clientY;
        floatingOverlay.style.display = 'block';
        
        document.addEventListener('mousemove', onDragging);
        document.addEventListener('touchmove', onDragging, { passive: false });
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchend', onDragEnd);
    };

    const onDragging = (e) => {
        e.preventDefault();
        
        const coords = getEventCoords(e);
        const deltaX = coords.clientX - initialX;
        const deltaY = coords.clientY - initialY;
        let newX = currentX + deltaX;
        let newY = currentY + deltaY;

        if (!isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
            isDragging = true;
            handler.classList.add('is-dragging');
            chatbotFloatingContainer.style.display = 'none';
        }

        isDragging && (handler.style.transform = `translate(${newX}px, ${newY}px) scale(1.2)`);
    };

    const onDragEnd = (e) => {
        floatingOverlay.style.display = 'none';

        if (!isDragging) {
            handleClick();
        }
        else {
            isDragging = false;
            handler.classList.remove('is-dragging');
            
            const coords = getEventCoords(e.changedTouches ? e.changedTouches[0] : e);
            const deltaX = coords.clientX - initialX;
            const deltaY = coords.clientY - initialY;
            currentX += deltaX;
            currentY += deltaY;

            handler.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.0)`;
        }

        document.removeEventListener('mousemove', onDragging);
        document.removeEventListener('touchmove', onDragging);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchend', onDragEnd);
    };

    handler.addEventListener('mousedown', onDragStart);
    handler.addEventListener('touchstart', onDragStart, { passive: false });
};