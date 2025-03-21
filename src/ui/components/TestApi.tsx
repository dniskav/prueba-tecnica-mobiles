import { useState } from 'react'
import '../../App.css'
import { fetchProductById, fetchProducts } from '../../modules/product/infrastructure/ProductApi'

function TestApi() {
  const [productId, setProductId] = useState('')

  /**
   * Handle fetching all products and logging to the console.
   */
  const handleFetchProducts = async () => {
    try {
      const products = await fetchProducts()
      console.log('Product List:', products)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  /**
   * Handle fetching a single product by ID and logging to the console.
   */
  const handleFetchProductById = async () => {
    if (!productId.trim()) {
      console.warn('Please enter a product ID')
      return
    }

    try {
      const product = await fetchProductById(productId)
      console.log(`Product Details (${productId}):`, product)
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Fetch all products */}
      <button onClick={handleFetchProducts} style={{ marginRight: '10px', padding: '10px' }}>
        Fetch Products
      </button>

      <br />
      <br />

      {/* Fetch a product by ID */}
      <input
        type="text"
        placeholder="Enter product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button onClick={handleFetchProductById} style={{ padding: '10px' }}>
        Fetch Product by ID
      </button>
    </div>
  )
}

export default TestApi
