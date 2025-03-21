import { ProductDetail, ProductListItem } from '../domain/Product'
import { fetchProducts, fetchProductById } from './ProductApi'

export const ProductRepository = {
  /**
   * Get all products
   * @returns {Promise<ProductListItem[]>} List of products
   */
  getAll: async (search?: string): Promise<ProductListItem[]> => {
    return fetchProducts(search)
  },

  /**
   * Get a product by ID
   * @param {string} id - The product ID
   * @returns {Promise<ProductDetail | null>} Product details or null if not found
   */
  getById: async (id: string): Promise<ProductDetail | null> => {
    return fetchProductById(id)
  }
}
