// src/modules/product/context/ProductContext.tsx
import { createContext, useReducer, useContext, useCallback, ReactNode } from 'react'
import { ProductDetail, ProductListItem } from '../../modules/product/domain/Product'
import { ProductService } from '../../modules/product/application/ProductService'

type ProductState = {
  items: ProductListItem[]
  selected: ProductDetail | null
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: ProductListItem[] }
  | { type: 'FETCH_DETAIL_SUCCESS'; payload: ProductDetail }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'CLEAR_DETAIL' }

const initialState: ProductState = {
  items: [],
  selected: null,
  loading: false,
  error: null
}

function productReducer(state: ProductState, action: Action): ProductState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload }
    case 'FETCH_DETAIL_SUCCESS':
      return { ...state, loading: false, selected: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'CLEAR_DETAIL':
      return { ...state, selected: null }
    default:
      return state
  }
}

type ProductContextType = {
  state: ProductState
  getProducts: (filter?: string) => void
  getProductById: (id: string) => void
  clearSelected: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialState)

  const getProducts = useCallback(async (filter?: string) => {
    dispatch({ type: 'FETCH_START' })
    try {
      const data = await ProductService.getAll(filter)
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Error fetching products' })
    }
  }, [])

  const getProductById = useCallback(async (id: string) => {
    dispatch({ type: 'FETCH_START' })
    try {
      const detail = await ProductService.getById(id)
      if (detail) {
        dispatch({ type: 'FETCH_DETAIL_SUCCESS', payload: detail })
      } else {
        dispatch({ type: 'FETCH_ERROR', payload: 'Product not found' })
      }
    } catch {
      dispatch({ type: 'FETCH_ERROR', payload: 'Error fetching product detail' })
    }
  }, [])

  const clearSelected = useCallback(() => {
    dispatch({ type: 'CLEAR_DETAIL' })
  }, [])

  return (
    <ProductContext.Provider value={{ state, getProducts, getProductById, clearSelected }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)
  if (!context) throw new Error('useProductContext must be used within ProductProvider')
  return context
}
