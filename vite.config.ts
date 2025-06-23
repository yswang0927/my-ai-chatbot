import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        sourcemap: false,
        assetsInlineLimit: 0,
        lib: {
            entry: './src/ai-chatbot.js',
            name: 'aichatbot',
            formats: ['umd'],
            fileName: (format) => `aichatbot.${format}.js`
        },
        rollupOptions: {
            output: {
                manualChunks: undefined, // 禁用手动分块
                inlineDynamicImports: true,
            }
        }
    }
});