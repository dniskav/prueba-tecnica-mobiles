import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './ui/stores/productContext.tsx'
import { CartProvider } from './ui/stores/cartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ProductProvider>
    <CartProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </CartProvider>
  </ProductProvider>
)
