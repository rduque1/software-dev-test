/* global jQuery */
import { h, render } from 'https://unpkg.com/preact@latest?module'
import htm from 'https://unpkg.com/htm?module'
import App from './app.js'

const html = htm.bind(h)

jQuery(document).ready(() => {
  render(html`<${App} />`, document.getElementById('app'))
})
