// src/modules/product/context/ProductContext.tsx
import { createContext, useReducer, useContext, ReactNode, useEffect } from 'react'
import { ProductDetail, ProductListItem } from '../../modules/product/domain/Product'
import { ProductService } from '../../modules/product/application/ProductService'
import { useLocalStorage } from '../../core/hooks/useLocalStorage'

// Definir la estructura del estado
export interface ProductState {
  items: ProductListItem[]
  selected: ProductDetail | null
  loading: boolean
  error: string | null
  cart: CartItem[]
}

// Definir la estructura de un item del carrito
export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  capacity: string
  colorName: string
}

// Definir las acciones
type ProductAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: ProductListItem[] }
  | { type: 'FETCH_DETAIL_SUCCESS'; payload: ProductDetail }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'CLEAR_DETAIL' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }

// Definir el tipo del contexto
export interface ProductContextType {
  state: ProductState
  getProducts: (filter?: string) => void
  getProductById: (id: string) => void
  clearSelected: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

// Estado inicial
const initialState: ProductState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
  cart: []
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
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
    case 'SET_CART':
      return { ...state, cart: action.payload }
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    default:
      return state
  }
}

// Proveedor del contexto
export function ProductProvider({ children }: { children: ReactNode }) {
  // Use localStorage to persist cart
  const [savedCart, setSavedCart] = useLocalStorage<CartItem[]>('phonestore_cart', [])

  const [state, dispatch] = useReducer(productReducer, {
    ...initialState,
    cart: savedCart
  })

  useEffect(() => {
    setSavedCart(state.cart)
  }, [state.cart, setSavedCart])

  const getProducts = async (filter?: string) => {
    dispatch({ type: 'FETCH_START' })
    try {
      const data = await ProductService.getAll(filter)
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Error fetching products' })
    }
  }

  const getProductById = async (id: string) => {
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
  }

  const clearSelected = () => {
    dispatch({ type: 'CLEAR_DETAIL' })
  }

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item })
  }

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <ProductContext.Provider
      value={{
        state,
        getProducts,
        getProductById,
        clearSelected,
        addToCart,
        removeFromCart,
        clearCart
      }}>
      {children}
    </ProductContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useProductContext(): ProductContextType {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within ProductProvider')
  }
  return context
}
