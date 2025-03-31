import { ProductListItem, ProductDetail } from '../domain/Product'
import { productApiFetch } from './ProductApiClient'

export const removeDuplicates = (products: ProductListItem[]): ProductListItem[] => {
  const uniqueProducts = new Map()
  products.forEach((product) => {
    uniqueProducts.set(product.id, product)
  })
  return Array.from(uniqueProducts.values())
}

export const fetchProducts = async (search?: string): Promise<ProductListItem[]> => {
  const params = new URLSearchParams()

  if (search) {
    params.append('search', search)
  }

  const queryString = params.toString()
  const products = await productApiFetch<ProductListItem[]>(queryString ? `?${queryString}` : '')

  return removeDuplicates(products)
}

export const fetchProductById = async (productId: string): Promise<ProductDetail | null> => {
  return productApiFetch<ProductDetail>(`/${productId}`)
}
