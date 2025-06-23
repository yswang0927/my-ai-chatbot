/**
 *  @file highlight-copy.js
 *  https://github.com/arronhunt/highlightjs-copy
 */

const CopyButtonPlugin_Locales = {
  en: ["Copy", "Copied!", "Copied to clipboard"],
  es: ["Copiar", "¡Copiado!", "Copiado al portapapeles"],
  "pt-BR": ["Copiar", "Copiado!", "Copiado para a área de transferência"],
  fr: ["Copier", "Copié !", "Copié dans le presse-papier"],
  de: ["Kopieren", "Kopiert!", "In die Zwischenablage kopiert"],
  ja: ["コピー", "コピーしました！", "クリップボードにコピーしました"],
  ko: ["복사", "복사됨!", "클립보드에 복사됨"],
  ru: ["Копировать", "Скопировано!", "Скопировано в буфер обмена"],
  zh: ["复制", "已复制!", "已复制到剪贴板"],
  "zh-tw": ["複製", "已複製!", "已複製到剪貼簿"],
};

/**
 * Adds a copy button to highlightjs code blocks
 */
export default class CopyButtonPlugin {
  /**
   * Create a new CopyButtonPlugin class instance
   * @param {Object} [options] - Functions that will be called when a copy event fires
   * @param {CopyCallback} [options.callback]
   * @param {Hook} [options.hook]
   * @param {String} [options.lang] Defaults to the document body's lang attribute and falls back to "en"
   * @param {Boolean} [options.autohide=true] Automatically hides the copy button until a user hovers the code block. Defaults to False
   */
  constructor(options = {}) {
    this.hook = options.hook;
    this.callback = options.callback;
    this.lang = options.lang || document.documentElement.lang || "en";
    this.autohide =
      typeof options.autohide !== "undefined" ? options.autohide : true;
  }
  "after:highlightElement"({ el, text }) {
    // If the code block already has a copy button, return.
    if (el.parentElement.querySelector(".hljs-copy-button")) return;

    let { hook, callback, lang, autohide } = this;

    // Create the copy button and append it to the codeblock.
    let container = Object.assign(document.createElement("div"), {
      className: "hljs-copy-container",
    });
    container.dataset.autohide = autohide;

    let button = Object.assign(document.createElement("button"), {
      innerHTML: CopyButtonPlugin_Locales[lang]?.[0] || "Copy",
      className: "hljs-copy-button",
    });
    button.dataset.copied = false;

    el.parentElement.classList.add("hljs-copy-wrapper");
    el.parentElement.appendChild(container);
    container.appendChild(button);

    // Add a custom proprety to the container so that the copy button can reference and match its theme values.
    container.style.setProperty(
      "--hljs-theme-background",
      window.getComputedStyle(el).backgroundColor
    );
    container.style.setProperty(
      "--hljs-theme-color",
      window.getComputedStyle(el).color
    );
    container.style.setProperty(
      "--hljs-theme-padding",
      window.getComputedStyle(el).padding
    );

    button.onclick = function () {
      if (!navigator.clipboard) return;

      let newText = text;
      if (hook && typeof hook === "function") {
        newText = hook(text, el) || text;
      }

      navigator.clipboard
        .writeText(newText)
        .then(function () {
          button.innerHTML = CopyButtonPlugin_Locales[lang]?.[1] || "Copied!";
          button.dataset.copied = true;

          let alert = Object.assign(document.createElement("div"), {
            role: "status",
            className: "hljs-copy-alert",
            innerHTML: CopyButtonPlugin_Locales[lang]?.[2] || "Copied to clipboard",
          });
          el.parentElement.appendChild(alert);

          setTimeout(() => {
            button.innerHTML = CopyButtonPlugin_Locales[lang]?.[0] || "Copy";
            button.dataset.copied = false;
            el.parentElement.removeChild(alert);
            alert = null;
          }, 2000);
        })
        .then(function () {
          if (typeof callback === "function") return callback(newText, el);
        });
    };
  }
}
