import App from './App.svelte'
import './scss/style.scss'
import './app.css'
import '@popperjs/core'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_AUTH_DOMAIN",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
  appId: "FIREBASE_APP_ID",
  measurementId: "FIREBASE_MEASUREMENT_ID"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

const app = new App({
  target: document.getElementById('app')
})

export default app
