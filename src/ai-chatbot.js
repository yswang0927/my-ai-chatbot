import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { 
    isPlainObject,
    throttle, 
    deepMerge, 
    copyToClipboard, 
    extractRawCodeFromHighlight, 
    downloadSvg,
    uuid,
    watchArray
} from './utils';

import { renderMarkdown } from './markdown';

//import './style.css';
import 'katex/dist/katex.min.css';
import 'rehype-callouts/theme/github';

import highlightStyle from 'highlight.js/styles/github.css?raw';
import chatbotStyle from './style.css?raw';

import botIcon from './assets/bot.svg?raw';
import sendIcon from './assets/send.svg?raw';
import abortIcon from './assets/abort.svg?raw';
import arrowRight from './assets/arrow-right.svg?raw';
import closeIcon from './assets/close.svg?raw';
import attachIcon from './assets/attach.svg?raw';
import micIcon from './assets/mic.svg?raw';
import webSearchIcon from './assets/websearch.svg?raw';
import settingsIcon from './assets/settings.svg?raw';
import hammerIcon from './assets/hammer.svg?raw';
import modelIcon from './assets/llm-model.svg?raw';
import newChatIcon from './assets/newchat.svg?raw';
import searchIcon from './assets/search.svg?raw';
import clearIcon from './assets/clear.svg?raw';


export class AIChatbot {
    constructor(options) {
        this.options = deepMerge({
            container: document.body,
            theme: 'light',
            style: {
                '--aichatbot-primary-brand-color': '#1e96eb'
            },
            openai: {
                baseUrl: '',
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
            file: {
                enabled: true,
                onUpload: null
            },
            mcp: {
                enabled: true,
                searchMcp: () => Promise.resolve([])
            },
            // 语音输入
            micInput: {
                enabled: false,
                onMicInput: () => Promise.resolve(null)
            },
            // 联网搜索
            webSearch: {
                enabled: true,
                onWebSearch: () => Promise.resolve(null)
            },
            tools: [], // [{icon, label}]
            onToolsClick: (tool, chatbot, event) => {}
           
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
        if (isPlainObject(this.options.header)) {
            const { botIcon, botTitle } = this.options.header;
            chatbotHeader = `
            <div class="ai-chatbot-header">
                <div class="ai-chatbot-panel-l">
                    <span class="ai-chatbot-header-icon">${botIcon}</span>
                    <span class="ai-chatbot-header-title">${botTitle}</span>
                </div>
                <div class="ai-chatbot-panel-r">
                    <button data-ref="action-close" class="ai-chatbot-btn" data-variant="minimal">${closeIcon}</button>
                </div>
            </div>
            `;
        }

        const fileEnabled = isPlainObject(this.options.file) && this.options.file.enabled;
        const micInputEnabled = isPlainObject(this.options.micInput) && this.options.micInput.enabled;
        const webSearchEnabled = isPlainObject(this.options.webSearch) && this.options.webSearch.enabled;
        const mcpEnabled = isPlainObject(this.options.mcp) && this.options.mcp.enabled;

        const shadowContainer = container.attachShadow({ mode: "open" });

        shadowContainer.innerHTML = `
        <style>
        :host {
            height:100%;
            display:block;
        }
        ${highlightStyle}
        ${chatbotStyle}
        .ai-chatbot {
            --aichatbot-primary-brand-color: ${this.options.style['--aichatbot-primary-brand-color']};
        }
        </style>
        <div class="ai-chatbot">
            ${chatbotHeader}
            <div data-ref="chatbot-messages" class="ai-chatbot-messages"></div>
            <div class="ai-chatbot-composer">
                <div data-ref="suggestion-tools" class="ai-chatbot-suggestion-tools"></div>
                <div data-ref="input-container" class="ai-chatbot-input-container">
                    <div data-ref="preview-grid" class="ai-chatbot-file-preview-grid ai-chatbot-hide"></div>
                    <div><textarea data-ref="user-input" class="ai-chatbot-user-input" name="ai-chatbot-user-input" rows="2" cols="10" placeholder="有什么问题尽管问我"></textarea></div>
                    <div class="ai-chatbot-input-actions">
                        <div class="ai-chatbot-panel-l">
                            <button data-ref="action-newchat" class="ai-chatbot-btn" data-variant="outline" title="新对话"><span class="ai-chatbot-icon">${newChatIcon}</span></button>
                            ${ fileEnabled ? '<label class="ai-chatbot-btn ai-chatbot-action-selectfile" data-variant="outline" title="添加图片或文件"><span class="ai-chatbot-icon">'+ attachIcon +'</span><input data-ref="file-input" type="file" style="display:none;" multiple accept="application/json,application/javascript,text/plain,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.oasis.opendocument.spreadsheet,application/vnd.ms-excel.sheet.binary.macroEnabled.12,application/vnd.apple.numbers,text/markdown,application/x-yaml,application/xml,application/typescript,text/typescript,text/x-typescript,application/x-typescript,application/x-sh,text/*,application/pdf,image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/html,text/css,application/xhtml+xml,.js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.cs,.go,.rb,.php,.rs,.swift,.kt,.scala,.pl,.lua,.sh,.json,.yaml,.yml,.xml,.html,.htm,.css,.md,audio/mp3,audio/wav,audio/mp4,audio/mpeg,.mp3,.wav,.m4a"/></label>' : '' }
                            ${ webSearchEnabled ? '<button data-ref="action-websearch" class="ai-chatbot-btn" data-variant="outline" title="联网搜索"><span class="ai-chatbot-icon">'+ webSearchIcon +'</span></button>' : '' }
                            ${ mcpEnabled ? '<button data-ref="action-mcp" class="ai-chatbot-btn" data-variant="outline" title="MCP调用"><span class="ai-chatbot-icon">'+ hammerIcon +'</span></button>' : '' }
                            <div class="ai-chatbot-models-panel">
                                <div class="ai-chatbot-btn ai-chatbot-btn-group ai-chatbot-select-models" data-variant="outline">
                                    <button data-ref="action-select-models" class="ai-chatbot-btn">
                                        <span class="ai-chatbot-icon">${modelIcon}</span>
                                        <span data-ref="selected-model-name" class="ai-chatbot-btn-text">Qwen2.5</span>
                                        <span class="ai-chatbot-icon">${arrowRight}</span>
                                    </button>
                                    <button data-ref="action-model-settings" class="ai-chatbot-btn ai-chatbot-model-settings">
                                        <span class="ai-chatbot-icon">${settingsIcon}</span>
                                    </button>
                                </div>
                                <div data-ref="models-popup" class="ai-chatbot-dropdown ai-chatbot-hide">
                                    <div class="ai-chatbot-searchbar">
                                        <div class="ai-chatbot-input-group">
                                            <span class="ai-chatbot-icon">${searchIcon}</span>
                                            <input type="text" data-ref="model-search-input" />
                                        </div>
                                    </div>
                                    <div data-ref="models-menu" class="ai-chatbot-menu"></div>
                                </div>
                            </div>
                            <button data-ref="action-clear" class="ai-chatbot-btn" title="清空上下文"><span class="ai-chatbot-icon">${clearIcon}</span></button>
                        </div>
                        <div class="ai-chatbot-panel-r">
                            ${ micInputEnabled ? '<button data-ref="action-mic" class="ai-chatbot-btn ai-chatbot-action-mic" data-variant="outline" title="语音输入"><span class="ai-chatbot-icon">'+ micIcon +'</span></button>' : '' }
                            <button data-ref="action-send" class="ai-chatbot-btn" data-intent="emphasis" data-variant="fill" title="发送" disabled><span class="ai-chatbot-icon">${sendIcon}</span></button>
                            <button data-ref="action-abort" class="ai-chatbot-btn ai-chatbot-hide" data-variant="minimal" title="停止输出"><span class="ai-chatbot-icon">${abortIcon}</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.messages = [];
        this._refs = {};
        this._loading = false;
        this._abortController = null;
        this._autoScrolling = true;
        this._files = [];
        this._webSearchActivated = false;
        this._selectedModel = '';
        Object.defineProperty(this, 'selectedModel', {
            get() {
                return this._selectedModel;
            },
            set(newValue) {
                if (newValue != this._selectedModel) {
                    this._selectedModel = newValue;
                    this._refs['selected-model-name'].innerText = newValue;
                }
            }
        });
        
        this._ACTIONS = {
            'action-send': () => this.sendMessage(this._refs['user-input'].value.trim()),
            'action-abort': () => this.abortChat(),
            'action-newchat': () => this.newSession(),
            'action-close': (e) => {
                if (typeof this.options.header?.onClose === 'function') {
                    this.options.header.onClose(this, e);
                }
            },
            'action-websearch': (e) => {
                this._webSearchActivated = !this._webSearchActivated;
                e.currentTarget.classList.toggle('ai-chatbot-activated');
            },
            'action-select-models': (e) => {
                const trigger = e.currentTarget;
                const rect = trigger.getBoundingClientRect();
                const modelsPopup = this._refs['models-popup'];
                modelsPopup.style.maxHeight = (rect.top - 30) + 'px';
                const modelsMenu = this._refs['models-menu'];
                modelsPopup.classList.remove('ai-chatbot-hide');

                this.getModels((modelNames) => {
                    modelsMenu.innerHTML = '';
                    modelNames.forEach(model => {
                        let item = document.createElement('div');
                        item.className = 'ai-chatbot-menu-item';
                        item.setAttribute('data-model', model);
                        item.innerHTML = `<div class="ai-chatbot-icon">${modelIcon}</div><div class="ai-chatbot-menu-text">${model}</div>`;
                        item.addEventListener('click', (e) => {
                            this.selectedModel = e.currentTarget.getAttribute('data-model');
                            modelsPopup.classList.add('ai-chatbot-hide');
                        });
                        modelsMenu.appendChild(item);
                    });
                });
            }
        };

        const refs = shadowContainer.querySelectorAll('[data-ref]');
        refs.forEach(ele => {
            let dataRef = ele.getAttribute('data-ref');
            if (dataRef) {
                this._refs[dataRef] = ele;
                if (this._ACTIONS[dataRef]) {
                    ele.addEventListener('click', this._ACTIONS[dataRef]);
                }
            }
        });

        this.setupEventListeners();
        this.setupTools();
    }
    
    setupEventListeners() {
        const userInputRef = this._refs['user-input'];

        this._refs['input-container'].addEventListener('pointerdown', (e) => {
            (e.target !== userInputRef && e.target.tagName !== 'INPUT') && (e.preventDefault(), userInputRef.focus());
        });

        userInputRef.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage(userInputRef.value.trim());
            }
        });
        userInputRef.addEventListener('input', () => {
            if (userInputRef.value.trim()) {
                this._refs['action-send'].removeAttribute('disabled');
            } else {
                this._refs['action-send'].setAttribute('disabled', "");
            }

            userInputRef.style.height = 'auto';
            let sh = userInputRef.scrollHeight;
            if (sh > 200) {
                sh = 200;
            }
            userInputRef.style.height = sh + 'px';
        });
        userInputRef.addEventListener('focus', (e) => {
            const inputGroup = e.target.closest('.ai-chatbot-input-group');
            inputGroup?.setAttribute('data-focused', 'true');
        });
        userInputRef.addEventListener('blur', (e) => {
            const inputGroup = e.target.closest('.ai-chatbot-input-group');
            inputGroup?.setAttribute('data-focused', 'false');
        });

        // 允许用户手工滚动
        const scrollArea = this._refs['chatbot-messages'];
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

        // 事件委托
        this._refs['chatbot-messages'].addEventListener('click', (e) => {
            const target = e.target;
            // 处理代码块复制按钮
            const copyButton = target.closest('.ai-chatbot-code-copy-btn');
            if (copyButton) {
                const codeNode = copyButton.closest('.ai-chatbot-codeblock-wrapper')?.querySelector('code');
                if (codeNode) {
                    const codeToCopy = extractRawCodeFromHighlight(codeNode);
                    copyToClipboard(codeToCopy, () => {
                        copyButton.classList.add('copied');
                        setTimeout(() => {
                            copyButton.classList.remove('copied');
                        }, 3500);
                    });
                }
                return;
            }

            // 处理 Mermaid 预览按钮
            const mermaidPreviewButton = target.closest('.ai-chatbot-mermaid-preview-btn');
            if (mermaidPreviewButton) {
                const mermaidWrapper = mermaidPreviewButton.closest('.ai-chatbot-mermaid-wrapper');
                if (!mermaidWrapper) {
                    return;
                }
                mermaidWrapper.classList.remove('show-mermaid-source');
                mermaidWrapper.classList.add('show-mermaid-preview');
                return;
            }
            // 处理 Mermaid 源代码按钮
            const mermaidSourceButton = target.closest('.ai-chatbot-mermaid-source-btn');
            if (mermaidSourceButton) {
                const mermaidWrapper = mermaidSourceButton.closest('.ai-chatbot-mermaid-wrapper');
                if (!mermaidWrapper) {
                    return;
                }
                mermaidWrapper.classList.remove('show-mermaid-preview');
                mermaidWrapper.classList.add('show-mermaid-source');
                return;
            }
            // 处理 Mermaid 复制按钮
            const mermaidCopyButton = target.closest('.ai-chatbot-mermaid-copy-btn');
            if (mermaidCopyButton) {
                const mermaidWrapper = mermaidCopyButton.closest('.ai-chatbot-mermaid-wrapper');
                if (!mermaidWrapper) {
                    return;
                }
                const mermaidCode = mermaidWrapper.querySelector('pre.ai-chatbot-mermaid-source-pre');
                if (mermaidCode) {
                    copyToClipboard(mermaidCode.innerText, () => {
                        mermaidCopyButton.classList.add('copied');
                        setTimeout(() => {
                            mermaidCopyButton.classList.remove('copied');
                        }, 3500);
                    });
                }
            }
            // 处理下载SVG按钮
            const mermaidDownloadButton = target.closest('.ai-chatbot-mermaid-download-btn');
            if (mermaidDownloadButton) {
                const mermaidWrapper = mermaidDownloadButton.closest('.ai-chatbot-mermaid-wrapper');
                if (!mermaidWrapper) {
                    return;
                }
                const svgNode = mermaidWrapper.querySelector('.ai-chatbot-mermaid-diagram > svg');
                if (svgNode) {
                    downloadSvg(svgNode.outerHTML, 'svg');
                }
            }
            // 处理 Mermaid 全屏按钮
            const mermaidFullscreenButton = target.closest('.ai-chatbot-mermaid-fullscreen-btn');
            if (mermaidFullscreenButton) {
                const mermaidWrapper = mermaidFullscreenButton.closest('.ai-chatbot-mermaid-wrapper');
                mermaidWrapper && mermaidWrapper.classList.toggle('fullscreen');
            }

        });

        // 文件上传处理
        if (this._refs['file-input']) {
            const fileInput = this._refs['file-input'];
            const previewGrid = this._refs['preview-grid'];

            // 创建一个可监听变化的代理数组对象
            this._files = watchArray([], (files, changes) => {
                console.log(changes);
                if (files.length === 0) {
                    previewGrid.classList.add('ai-chatbot-hide');
                    previewGrid.innerHTML = '';
                    return;
                }

                const deleteItems = [];
                const children = previewGrid.querySelectorAll('[data-fileId]');
                children.forEach(c => {
                    const found = files.filter(f => f.fileId === c.getAttribute('data-fileId'));
                    if (found.length === 0) {
                        deleteItems.push(c);
                    }
                });
                deleteItems.forEach(item => previewGrid.removeChild(item));

                files.forEach((f) => {
                    if (!f._rendered_ && f.type.startsWith('image/')) {
                        f._rendered_ = true;
                        let ele = document.createElement('div');
                        ele.className = 'ai-chatbot-file-preview-item';
                        ele.setAttribute('data-fileId', f.fileId);
                        ele.innerHTML = `
                            <img src="${f.url}" title="${f.name}">
                            <button class="ai-chatbot-btn ai-chatbot-round ai-chatbot-action-rmfile">
                                <span class="ai-chatbot-icon">${closeIcon}</span>
                            </button>
                        `;
                        previewGrid.classList.remove('ai-chatbot-hide');
                        previewGrid.appendChild(ele);
                    }
                });
            });

            previewGrid.addEventListener('click', (e) => {
                const rmBtn = e.target.closest('button.ai-chatbot-action-rmfile');
                if (rmBtn) {
                    const item = rmBtn.closest('.ai-chatbot-file-preview-item');
                    const fileId = item.getAttribute('data-fileId');
                    const deleteIndex = this._files.findIndex(f => f.fileId === fileId);
                    if (deleteIndex > -1) {
                        this._files.splice(deleteIndex, 1);
                    }
                    return;
                }
            });

            const onUploadFile = (typeof this.options.file.onUpload === 'function') 
                ? this.options.file.onUpload 
                : (file) => {
                    if (!file.type.startsWith('image/')) {
                        return Promise.resolve(URL.createObjectURL(file));
                    }
                    // 默认实现将图片转换为base64
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            if (e.target?.result) {
                                resolve(e.target.result.toString());
                            }
                        };
                        reader.onerror = (e) => {
                            reject(e);
                        };
                        reader.readAsDataURL(file);
                    });
                }; 
            
            fileInput.addEventListener('change', (e) => {
                const files = e.target.files;
                if (!files || files.length === 0) {
                    return;
                }
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    let fileItem = {
                        'fileId': uuid(),
                        'type': file.type,
                        'name': file.name,
                        'size': file.size,
                        'url': ''
                    };

                    onUploadFile(file)
                        .then(url => {
                            fileItem.url = url;
                            this._files.push(fileItem);
                        }).catch(e => {
                            console.error(e);
                        });
                }
            });
        }
    }

    setupTools() {
        const tools = this.options.tools;
        if (!tools || tools.length === 0) {
            return;
        }
        
        const onToolsClick = this.options.onToolsClick || function(){};
        tools.forEach(item => {
            let btn = document.createElement('button');
            btn.className = 'ai-chatbot-btn';
            btn.innerHTML = (item.icon ? '<span class="ai-chatbot-icon">'+ item.icon +'</span>':'') 
                            + '<span class="ai-chatbot-btn-text">'+ (item.label || '') +'</span>';
            btn.addEventListener('click', (e) => {
                onToolsClick(item, this, e);
            });
            this._refs['suggestion-tools'].appendChild(btn);
        });
    }

    renderMessage(content, hostElement) {
        renderMarkdown(content, (result) => {
            hostElement.innerHTML = '';
            if (typeof result === 'string') {
                hostElement.innerHTML = result;
            } else {
                hostElement.appendChild(result);
            }
            hostElement.style.minHeight = hostElement.clientHeight + 'px';
            this.scrollToBottom();
        });
    }
    
    newSession() {
        this.abortChat();
        this.messages = [];
        this._refs['chatbot-messages'].innerHTML = '';
        this.clearFiles();
    }

    clearFiles() {
        if (this._files.length > 0) {
            this._files.length = 0;
        }
    }

    get loading() {
        return this._loading;
    }
    set loading(isLoading) {
        this._loading = !!isLoading;
        if (this._loading) {
            this._refs['action-send'].classList.add('ai-chatbot-hide');
            this._refs['action-abort'].classList.remove('ai-chatbot-hide');
        } else {
            this._refs['action-abort'].classList.add('ai-chatbot-hide');
            this._refs['action-send'].classList.remove('ai-chatbot-hide');
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
                messageDiv.innerHTML = `<div class="ai-chatbot-message">
                    <div class="ai-chatbot-message-content">${content}</div>
                </div>`;
            } else {
                messageDiv.innerHTML = `<div class="ai-chatbot-avatar">${botIcon}</div>
                <div class="ai-chatbot-message">
                    <div class="ai-chatbot-message-thinking ai-chatbot-hide collapsed">
                        <div class="ai-chatbot-message-thinking-header">
                            <span class="ai-chatbot-message-thinking-tip"></span>
                            <span class="ai-chatbot-message-thinking-icon">${arrowRight}</span>
                        </div>
                        <div class="ai-chatbot-message-thinking-content"></div>
                    </div>
                    <div class="ai-chatbot-message-content"></div>
                </div>`;

                this.renderMessage(content, messageDiv.querySelector('.ai-chatbot-message-content'));
            }
        }
        
        this._refs['chatbot-messages'].appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        if (!this._autoScrolling) {
            return;
        }
        requestAnimationFrame(() => {
            this._refs['chatbot-messages'].scrollTop = this._refs['chatbot-messages'].scrollHeight;
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

    setMessages(messages) {
        if (!Array.isArray(messages)) {
            throw new Error('`messages` should be an array');
        }
        this.messages = messages;
        this._refs['chatbot-messages'].innerHTML = '';
        this.messages.forEach(msg => {
            const isUser = msg.role === 'user';
            this.addMessage(msg.content, isUser, false);
        });
        this.scrollToBottom();
    }

    getModels(callback) {
        let apiBaseUrl = this.options.openai?.baseUrl;
        let apiKey = this.options.openai?.apiKey || '';
        if (!apiBaseUrl) {
            return;
        }

        while (apiBaseUrl.charAt(apiBaseUrl.length - 1) === '/') {
            apiBaseUrl = apiBaseUrl.substring(0, apiBaseUrl.length - 1);
        }

        fetch(apiBaseUrl + '/v1/models', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            }
        })
        .then(resp => resp.json())
        .then(result => {
            // {"object":"list","data":[{"id":"deepseek-r1","object":"model"},...]}
            const models = (result.data || []).filter(item => 'model' === item.object);
            callback(models.map(item => item.id));
        })
        .catch(e => {
            callback([]);
        });
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
        let apiBaseUrl = openai?.baseUrl;
        const apiKey = openai?.apiKey;
        const model = openai?.model;

        if (!apiBaseUrl) {
            throw new Error('`openai baseUrl` is required.');
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
        
        this._refs['user-input'].value = '';
        this._refs['user-input'].style.height = 'auto';
        this._refs['user-input'].dispatchEvent(new Event('input', { bubbles: true }));

        this.clearFiles();
        
        // 立刻显示AI请求中提示气泡
        this.addMessage('', false, true);

        // 获取将要显示内容的元素
        let thinkingEle = null;
        let thinkingTipEle = null;
        let thinkingContentEle = null;
        let mainContentEle = null;
        const lastMessageEle = this._refs['chatbot-messages'].lastElementChild;
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
            this.renderMessage(content, thinkingContentEle);
            if (end) {
                thinkingEle.classList.add('collapsed');
            }
        }, 230);

        const renderMainContent = throttle((content) => {
            if (!mainContentEle) return;
            this.renderMessage(content, mainContentEle);
        }, 230);
        

        const systemPrompt = openai?.systemPrompt || '';
        const requestBody = {
            model: model,
            messages: systemPrompt ? [{role:'system', content: systemPrompt}].concat(this.messages) : this.messages,
            stream: true
        };

        this._abortController = new AbortController();
        const abortSignal = this._abortController.signal;

        try {
            while (apiBaseUrl.charAt(apiBaseUrl.length - 1) === '/') {
                apiBaseUrl = apiBaseUrl.substring(0, apiBaseUrl.length - 1);
            }
            const response = await fetch(apiBaseUrl + '/v1/chat/completions', {
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
            background-color: var(--aichatbot-primary-brand-color);
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

window.customElements.define('ai-chatbot-floating-assistant', AIChatbotFloatingAssistant);

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
            '--aichatbot-primary-brand-color': '#1e96eb'
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
            if (key.startsWith('--')) {
                handler.style.setProperty(key, val);
            } else {
                handler.style[key] = val;
            }
        }
    }
    handler.style.zIndex = baseZindex;

    const chatbotFloatingContainer = document.createElement('div');
    chatbotFloatingContainer.className = 'ai-chatbot-floating-container';
    chatbotFloatingContainer.style.cssText = `display:none;position:fixed;z-index:${baseZindex+2};left:0;top:0;width:400px;height:80vh;border-radius:6px;background-color:#fdfdfd;box-shadow: 0 0 0 1px rgba(17, 20, 24, .1),0 1px 1px rgba(17, 20, 24, .2),0 2px 6px rgba(17, 20, 24, .2);`;
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
    let viewportRange = [];

    const getEventCoords = (e) => e.touches ? e.touches[0] : e;

    const onDragStart = (e) => {
        const coords = getEventCoords(e);
        initialX = coords.clientX;
        initialY = coords.clientY;
        floatingOverlay.style.display = 'block';

        // 计算限制窗口范围
        const rect = handler.getBoundingClientRect();
        viewportRange = [
            -rect.left + currentX, 
            window.innerWidth - rect.right + currentX, 
            -rect.top + currentY, 
            window.innerHeight - rect.bottom + currentY
        ];
        
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

        // 限制拖动范围在屏幕内
        if (newX < viewportRange[0]) {
            newX = viewportRange[0];
        } else if (newX > viewportRange[1]) {
            newX = viewportRange[1];
        }
        if (newY < viewportRange[2]) {
            newY = viewportRange[2];
        } else if (newY > viewportRange[3]) {
            newY = viewportRange[3];
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

            // 限制拖动范围在屏幕内
            if (currentX < viewportRange[0]) {
                currentX = viewportRange[0];
            } else if (currentX > viewportRange[1]) {
                currentX = viewportRange[1];
            }
            if (currentY < viewportRange[2]) {
                currentY = viewportRange[2];
            } else if (currentY > viewportRange[3]) {
                currentY = viewportRange[3];
            }

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