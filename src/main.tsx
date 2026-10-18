import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

// base: './' в vite.config даёт BASE_URL='./' — для BrowserRouter нужен
// абсолютный путь. Разворачиваем его относительно текущего документа:
// локально получится '/', на GitHub Pages — '/app2/'.
const routerBasename = new URL(import.meta.env.BASE_URL, document.baseURI).pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)