import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import fg  from 'fast-glob'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputs = [];

for (const entry of fg.sync('src/**/*.html')) {
  console.log(resolve(__dirname, entry));
  inputs.push(resolve(__dirname, entry));
}

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  root: resolve(__dirname, 'src'),
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index/index.html'),
        login: resolve(__dirname, 'src/login/index.html'),
      }
    },
    outDir: resolve(__dirname, 'dist'),
  },
})
