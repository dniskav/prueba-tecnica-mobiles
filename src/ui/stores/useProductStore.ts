import { create } from 'zustand'
import { ProductDetail, ProductListItem } from '../../modules/product/domain/Product'
import { ProductService } from '../../modules/product/application/ProductService'

type ProductStore = {
  products: ProductListItem[]
  productDetail: ProductDetail | null
  loading: boolean
  error: string | null
  fetchProducts: (filter: string | undefined) => Promise<void>
  fetchProductDetail: (id: string | undefined) => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  productDetail: null,
  error: null,
  fetchProductDetail: async (id: string) => {
    set({ loading: true, error: null })
    const productDetail = await ProductService.getById(id)
    set({ productDetail, loading: false })
  },
  fetchProducts: async (filter?: string) => {
    set({ loading: false, error: null })
    try {
      const products = await ProductService.getAll(filter)
      set({ products, loading: false })
    } catch (err) {
      set({ error: `error: ${err}`, loading: false })
    }
  }
}))
