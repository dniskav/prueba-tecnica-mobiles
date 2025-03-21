import { ProductListItem, ProductDetail } from '../domain/Product'
import { ProductRepository } from '../infrastructure/ProductRepository'

export const ProductService = {
  /**
   * Get all products from the repository
   * @returns {Promise<ProductListItem[]>} List of products
   */
  getAllProducts: async (): Promise<ProductListItem[]> => {
    return ProductRepository.getAll()
  },

  /**
   * Get a product by ID and apply transformations if necessary
   * @param {string} productId - The product ID
   * @returns {Promise<ProductDetail | null>} Detailed product data or null if not found
   */
  getProductById: async (productId: string): Promise<ProductDetail | null> => {
    const product = await ProductRepository.getById(productId)
    if (!product) return null

    // Example: Add custom logic if needed (e.g., format price, add computed values)
    return {
      ...product,
      formattedPrice: `$${product.basePrice.toFixed(2)}` // Example of a computed property
    }
  }
}
