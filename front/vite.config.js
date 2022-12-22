import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dotenv from 'dotenv';
import replace from 'rollup-plugin-replace';

dotenv.config();

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
