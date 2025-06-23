# my-ai-chatbot

使用原生javascript开发的AI-Chat前端组件

## 使用方式1

```js
import { AIChatbot } from './ai-chatbot'

const chatbot = new AIChatbot({
  container: document.querySelector('#app'),
  header: false,
  openai: {
    url: "http://localhost:11434/v1/chat/completions",
    apiKey: "",
    model: "deepseek-r1:7b"
  },
  tools: [
    {label: '总结网页', icon:'<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.939 2.618h14.236a.97.97 0 0 1 .97.97v9.059h1.618V3.588A2.588 2.588 0 0 0 18.175 1H3.939a2.588 2.588 0 0 0-2.588 2.588v16.824A2.588 2.588 0 0 0 3.939 23h8.356v-1.618H3.939a.97.97 0 0 1-.97-.97V3.588a.97.97 0 0 1 .97-.97zm1.294 2.911h1.618v1.618H5.233V5.529zm11.647 0H9.116v1.618h7.764V5.529zm0 5.475H9.116v1.617h7.764v-1.617zm-10.029 0H5.233v1.617h1.618v-1.617zm12.132 4.41c-.046-.238-.388-.238-.434 0a4.444 4.444 0 0 1-3.487 3.486c-.238.048-.238.388 0 .435a4.444 4.444 0 0 1 3.487 3.486c.047.239.388.239.434 0a4.444 4.444 0 0 1 3.487-3.486c.238-.048.238-.388 0-.435a4.444 4.444 0 0 1-3.487-3.486z"/></svg>'}
  ],
  onToolsClick: (item, e) => {
    if (item.label === '总结网页') {
      chatbot.sendMessage('总结当前网页', `
      概括总结以下网页内容的核心主题，字数不能多于原文字数：
      -----
      ${document.body.innerText}
      -----
      `);
    }
  }
});

```


## 使用方式2: 右下角浮动ICON形式

```js
import { floatingAssistant } from './ai-chatbot'

floatingAssistant({
  openai: {
    url: "http://localhost:11434/v1/chat/completions",
    apiKey: "",
    model: "deepseek-r1:7b"
  },
  tools: [
    {label: '总结网页', icon:'<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.939 2.618h14.236a.97.97 0 0 1 .97.97v9.059h1.618V3.588A2.588 2.588 0 0 0 18.175 1H3.939a2.588 2.588 0 0 0-2.588 2.588v16.824A2.588 2.588 0 0 0 3.939 23h8.356v-1.618H3.939a.97.97 0 0 1-.97-.97V3.588a.97.97 0 0 1 .97-.97zm1.294 2.911h1.618v1.618H5.233V5.529zm11.647 0H9.116v1.618h7.764V5.529zm0 5.475H9.116v1.617h7.764v-1.617zm-10.029 0H5.233v1.617h1.618v-1.617zm12.132 4.41c-.046-.238-.388-.238-.434 0a4.444 4.444 0 0 1-3.487 3.486c-.238.048-.238.388 0 .435a4.444 4.444 0 0 1 3.487 3.486c.047.239.388.239.434 0a4.444 4.444 0 0 1 3.487-3.486c.238-.048.238-.388 0-.435a4.444 4.444 0 0 1-3.487-3.486z"/></svg>'}
  ],
  onToolsClick: (item, e) => {
    if (item.label === '总结网页') {
      chatbot.sendMessage('总结当前网页', `
      概括总结以下网页内容的核心主题，字数不能多于原文字数：
      -----
      ${document.body.innerText}
      -----
      `);
    }
  }
});
```

## 使用方式3:

```html
<script src="./dist/aichatbot.umd.js"></script>

<script>
const { AIChatbot, floatingAssistant } = window.aichatbot;

const chatbot = new AIChatbot({
  container: document.querySelector('#app'),
  header: false,
  openai: {
    url: "",
    apiKey: "",
    model: ""
  },
  tools: [],
  onToolsClick: (item, e) => {}
});

// 浮动ICON式
floatingAssistant({
  openai: {
    url: "",
    apiKey: "",
    model: ""
  },
  tools: [],
  onToolsClick: (item, e) => {}
});
</script>

```

![screen_20250623201652](https://github.com/user-attachments/assets/dc678548-34e6-4788-9b96-d7d20d07d70e)

