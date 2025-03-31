import { createContext, useReducer, useContext, ReactNode, useEffect } from 'react'
import { CartItem, CartItemWithoutQuantity } from '../../modules/cart/domain/CartItem'
import { CartService } from '../../modules/cart/application/CartService'
import { CartStorage } from '../../modules/cart/infrastructure/CartStorage'

export interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: CartItemWithoutQuantity }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'CLEAR_CART' }

export interface CartContextType {
  state: CartState
  addToCart: (item: CartItemWithoutQuantity) => void
  removeFromCart: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
  getTotalAmount: () => number
  getTotalItems: () => number
}

const initialState: CartState = {
  items: []
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload }
    case 'ADD_TO_CART': {
      const updatedCart = CartService.addToCart(state.items, action.payload)
      return { ...state, items: updatedCart }
    }
    case 'REMOVE_FROM_CART': {
      const updatedCart = CartService.removeFromCart(state.items, action.payload)
      return { ...state, items: updatedCart }
    }
    case 'DECREASE_QUANTITY': {
      const updatedCart = CartService.decreaseQuantity(state.items, action.payload)
      return { ...state, items: updatedCart }
    }
    case 'CLEAR_CART':
      return { ...state, items: CartService.clearCart() }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    ...initialState,
    items: CartStorage.getCart()
  })

  useEffect(() => {
    CartStorage.saveCart(state.items)
  }, [state.items])

  const addToCart = (newItem: CartItemWithoutQuantity) => {
    dispatch({ type: 'ADD_TO_CART', payload: newItem })
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

  const getTotalAmount = (): number => {
    return CartService.getTotalAmount(state.items)
  }

  const getTotalItems = (): number => {
    return CartService.getTotalItems(state.items)
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        getTotalAmount,
        getTotalItems
      }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider')
  }
  return context
}
