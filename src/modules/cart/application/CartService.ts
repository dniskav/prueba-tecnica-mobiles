import { CartItem, CartItemWithoutQuantity } from '../domain/CartItem'

export class CartService {
  static addToCart(cart: CartItem[], newItem: CartItemWithoutQuantity): CartItem[] {
    const itemKey = `${newItem.id}-${newItem.capacity}-${newItem.colorName}`
    const existingItemIndex = cart.findIndex(
      (item) => `${item.id}-${item.capacity}-${item.colorName}` === itemKey
    )

    if (existingItemIndex >= 0) {
      const existingItem = cart[existingItemIndex]
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        totalPrice: (existingItem.quantity + 1) * existingItem.price
      }

      return cart.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    } else {
      const itemWithQuantity = {
        ...newItem,
        quantity: 1,
        totalPrice: newItem.price
      }

      return [...cart, itemWithQuantity]
    }
  }

  static removeFromCart(cart: CartItem[], id: string): CartItem[] {
    return cart.filter((item) => item.id !== id)
  }

  static decreaseQuantity(cart: CartItem[], id: string): CartItem[] {
    const item = cart.find((item) => item.id === id)
    if (item && item.quantity > 1) {
      return cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: (item.quantity - 1) * item.price
            }
          : item
      )
    } else {
      return cart.filter((item) => item.id !== id)
    }
  }

  static clearCart(): CartItem[] {
    return []
  }

  static getTotalAmount(cart: CartItem[]): number {
    return cart.reduce((acc, item) => acc + item.totalPrice, 0)
  }

  static getTotalItems(cart: CartItem[]): number {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }
}
