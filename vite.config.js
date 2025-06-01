import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  root: resolve(__dirname, 'src'),
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src', 'index.html'),
        'nested/index': resolve(__dirname, 'src', 'nested', 'index.html'),
      },
    },
    outDir: resolve(__dirname, 'dist'),
  },
})
