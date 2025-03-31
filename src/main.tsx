import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './ui/stores/productContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ProductProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </ProductProvider>
)
