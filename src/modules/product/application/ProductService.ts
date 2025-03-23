import { ProductListItem, ProductDetail } from '../domain/Product'
import { ProductRepository } from '../infrastructure/ProductRepository'

export const ProductService = {
  getAll: async (search: string | undefined): Promise<ProductListItem[]> => {
    return ProductRepository.getAll(search)
  },

  getById: async (productId: string): Promise<ProductDetail | null> => {
    const product = await ProductRepository.getById(productId)
    if (!product) return null

    return {
      ...product,
      formattedPrice: `$${product.basePrice.toFixed(2)}`
    }
  }
}
