import { h } from 'https://unpkg.com/preact@latest?module'
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'

import htm from 'https://unpkg.com/htm?module'

const html = htm.bind(h)
const defaultPUTOptions = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  redirect: 'follow'
}

let resolved = true
/* global fetch */
export default function App (props) {
  const [isStopped, setIsStopped] = useState(false)
  const [imgObj, setImgObj] = useState(null)

  async function getDogImage () {
    const response = await fetch('/getDog')
    if (response.ok) {
      const json = await response.json()
      setImgObj(json)
    }
  }

  async function getDogImageSynchronously () {
    if (resolved) {
      resolved = false
      try {
        await getDogImage()
      } finally {
        resolved = true
      }
    }
  }
  useEffect(() => {
    getDogImageSynchronously()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(getDogImageSynchronously, 2000)
    return () => clearInterval(intervalId)
  }, [])

  async function stop () {
    setIsStopped(true)
    await fetch('/end', {
      ...defaultPUTOptions,
      body: JSON.stringify(imgObj || {})
    })
  }

  async function start () {
    setIsStopped(false)
    await fetch('/start', {
      ...defaultPUTOptions,
      body: JSON.stringify({})
    })
  }

  if (!imgObj) return html``
  return html`
    <div class='app'>
      <div class='image-name'>${imgObj.name}</div>
      <div class='image-container'>
        <img src=${imgObj.image} class='center' />
      </div>
      ${!isStopped && html`<button onClick=${stop} class='btn' >Stop</button>`}
      ${isStopped && html`<button onClick=${start} class='btn' >Start</button>`}
    </div>
  `
}
