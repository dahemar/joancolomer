import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Index2 from './pages/Index2.jsx'

// Check URL parameter to determine which version to show
const urlParams = new URLSearchParams(window.location.search)
const version = urlParams.get('v')

// Set data attribute on body for CSS targeting
document.body.setAttribute('data-version', version || '1')

const Component = version === '2' ? Index2 : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Component />
  </StrictMode>,
)
