import { ProductDetail, ProductListItem } from '../domain/Product'
import { fetchProducts, fetchProductById } from './ProductApi'

export const ProductRepository = {
  getAll: async (search?: string): Promise<ProductListItem[]> => {
    return fetchProducts(search)
  },

  getById: async (id: string): Promise<ProductDetail | null> => {
    return fetchProductById(id)
  }
}
