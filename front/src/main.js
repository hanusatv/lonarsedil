import App from './App.svelte'
import './scss/style.scss'
import './app.css'
import '@popperjs/core'

const app = new App({
  target: document.getElementById('app')
})

export default app
