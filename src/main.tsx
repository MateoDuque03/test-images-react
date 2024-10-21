import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ImageContextProvider } from './context/useImageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ImageContextProvider>
      <App />
    </ImageContextProvider>
  </StrictMode>,
)
