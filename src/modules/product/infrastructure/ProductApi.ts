import { ProductListItem, ProductDetail } from '../domain/Product'
import { productApiFetch } from './ProductApiClient'

export const removeDuplicates = (products: ProductListItem[]): ProductListItem[] => {
  const uniqueProducts = new Map()
  products.forEach((product) => {
    uniqueProducts.set(product.id, product) // Stores only the latest occurrence
  })
  return Array.from(uniqueProducts.values()) // Returns unique products
}

/**
 * Fetch the list of products from the API
 * @returns {Promise<ProductListItem[]>} List of available products
 */
export const fetchProducts = async (search?: string): Promise<ProductListItem[]> => {
  const params = new URLSearchParams()

  if (search) {
    params.append('search', search) // Add search query if provided
  }

  const queryString = params.toString()
  const products = await productApiFetch<ProductListItem[]>(queryString ? `?${queryString}` : '')

  return removeDuplicates(products)
}

/**
 * Fetch detailed information about a specific product by ID
 * @param {string} productId - Unique product identifier
 * @returns {Promise<ProductDetail | null>} Detailed product info or null if not found
 */
export const fetchProductById = async (productId: string): Promise<ProductDetail | null> => {
  return productApiFetch<ProductDetail>(`/${productId}`)
}
