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

export type CartItemWithoutQuantity = Omit<CartItem, 'quantity' | 'totalPrice'>
