import './app.css'
import App from './App.svelte'
import './scss/style.scss'
import '@popperjs/core'

const app = new App({
  target: document.getElementById('app')
})

export default app
