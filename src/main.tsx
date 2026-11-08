import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/cairo/wght.css'
import './styles/index.css'
import App from './App'

/**
 * Clickjacking defence-in-depth. A meta CSP cannot carry `frame-ancestors` and
 * GitHub Pages cannot send X-Frame-Options, so in production we refuse to run
 * inside someone else's frame. (Real protection needs a CDN/proxy header.)
 */
if (import.meta.env.PROD && window.top !== window.self) {
  document.documentElement.style.display = 'none'
  try {
    window.top!.location.href = window.self.location.href
  } catch {
    /* cross-origin top window: the page stays hidden */
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
