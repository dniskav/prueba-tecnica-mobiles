import { ProductListItem, ProductDetail } from '../domain/Product'
import { productApiFetch } from './ProductApiClient'

/**
 * Fetch the list of products from the API
 * @returns {Promise<ProductListItem[]>} List of available products
 */
export const fetchProducts = async (): Promise<ProductListItem[]> => {
  return productApiFetch<ProductListItem[]>('')
}

/**
 * Fetch detailed information about a specific product by ID
 * @param {string} productId - Unique product identifier
 * @returns {Promise<ProductDetail | null>} Detailed product info or null if not found
 */
export const fetchProductById = async (productId: string): Promise<ProductDetail | null> => {
  return productApiFetch<ProductDetail>(`/${productId}`)
}
