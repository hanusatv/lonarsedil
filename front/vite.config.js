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
      BASE_URL_BACK: process.env.BASE_URL_BACK,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
    })
  ],
  resolve: {
    alias: {
      '~bootstrap': '/node_modules/bootstrap'
    }
  }
})
