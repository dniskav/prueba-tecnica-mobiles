import { create } from 'zustand'
import { ProductListItem } from '../../modules/product/domain/Product'
import { ProductService } from '../../modules/product/application/ProductService'

type ProductStore = {
  products: ProductListItem[]
  loading: boolean
  error: string | null
  fetchProducts: (filter: string | undefined) => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
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
