import { createContext, useReducer, useContext, ReactNode, useEffect } from 'react'
import { ProductDetail, ProductListItem } from '../../modules/product/domain/Product'
import { ProductService } from '../../modules/product/application/ProductService'
import { useLocalStorage } from '../../core/hooks/useLocalStorage'

export interface ProductState {
  items: ProductListItem[]
  selected: ProductDetail | null
  loading: boolean
  error: string | null
  cart: CartItem[]
}

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  capacity: string
  colorName: string
  quantity: number
  totalPrice: number
}

type ProductAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: ProductListItem[] }
  | { type: 'FETCH_DETAIL_SUCCESS'; payload: ProductDetail }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'CLEAR_DETAIL' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'UPDATE_CART_ITEM'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'CLEAR_CART' }

export interface ProductContextType {
  state: ProductState
  getProducts: (filter?: string) => void
  getProductById: (id: string) => void
  clearSelected: () => void
  addToCart: (item: Omit<CartItem, 'quantity' | 'totalPrice'>) => void
  removeFromCart: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
}

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
    case 'ADD_TO_CART': {
      return { ...state, cart: [...state.cart, action.payload] }
    }
    case 'UPDATE_CART_ITEM': {
      return {
        ...state,
        cart: state.cart.map((item) => (item.id === action.payload.id ? action.payload : item))
      }
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) }
    case 'DECREASE_QUANTITY': {
      const item = state.cart.find((item) => item.id === action.payload)
      if (item && item.quantity > 1) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: (item.quantity - 1) * item.price
                }
              : item
          )
        }
      } else {
        return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) }
      }
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    default:
      return state
  }
}

export function ProductProvider({ children }: { children: ReactNode }) {
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

  const addToCart = (newItem: Omit<CartItem, 'quantity' | 'totalPrice'>) => {
    const itemKey = `${newItem.id}-${newItem.capacity}-${newItem.colorName}`
    const existingItemIndex = state.cart.findIndex(
      (item) => `${item.id}-${item.capacity}-${item.colorName}` === itemKey
    )

    if (existingItemIndex >= 0) {
      const existingItem = state.cart[existingItemIndex]
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        totalPrice: (existingItem.quantity + 1) * existingItem.price
      }
      dispatch({ type: 'UPDATE_CART_ITEM', payload: updatedItem })
    } else {
      const itemWithQuantity = {
        ...newItem,
        quantity: 1,
        totalPrice: newItem.price
      }
      dispatch({ type: 'ADD_TO_CART', payload: itemWithQuantity })
    }
  }

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  const decreaseQuantity = (id: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id })
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
        decreaseQuantity,
        clearCart
      }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext(): ProductContextType {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within ProductProvider')
  }
  return context
}
