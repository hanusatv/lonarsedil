import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import replace from 'rollup-plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    replace({
      BASE_URL_BACK: process.env.BASE_URL_BACK
    })
  ],
  resolve: {
    alias: {
      '~bootstrap': '/node_modules/bootstrap'
    }
  }
})
