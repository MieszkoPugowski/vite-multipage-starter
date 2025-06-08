import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { glob } from 'node:fs/promises'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputs = [];

for await (const entry of glob('src/**/*.html')) {
  console.log(resolve(__dirname, entry));
  inputs.push(resolve(__dirname, entry));
}

export default defineConfig({
  base: '/Zadanie-webowe/',
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
