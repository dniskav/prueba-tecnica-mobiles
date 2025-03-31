import { CartItem } from '../domain/CartItem'

const CART_STORAGE_KEY = 'phonestore_cart'

export class CartStorage {
  static saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error('Error saving cart to localStorage', error)
    }
  }

  static getCart(): CartItem[] {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      return storedCart ? JSON.parse(storedCart) : []
    } catch (error) {
      console.error('Error reading cart from localStorage', error)
      return []
    }
  }
}
