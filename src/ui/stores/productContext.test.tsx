import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProductProvider, useProductContext } from './productContext'
import { ReactNode } from 'react'

// Mock for ProductService
vi.mock('../../modules/product/application/ProductService', () => ({
  ProductService: {
    getAll: vi.fn(),
    getById: vi.fn()
  }
}))

// Mock for useLocalStorage
vi.mock('../../core/hooks/useLocalStorage', () => ({
  useLocalStorage: () => {
    const value: any[] = []
    const setValue = vi.fn()
    return [value, setValue]
  }
}))

describe('ProductContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ProductProvider>{children}</ProductProvider>
  )

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should add an item to cart', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper })

    const mockItem = {
      id: 'test-123',
      name: 'Test Phone',
      price: 999,
      imageUrl: 'test.jpg',
      capacity: '128GB',
      colorName: 'Black'
    }

    // Add item to cart
    act(() => {
      result.current.addToCart(mockItem)
    })

    // Check if cart has the item with quantity and totalPrice calculated
    expect(result.current.state.cart).toHaveLength(1)
    expect(result.current.state.cart[0]).toEqual({
      ...mockItem,
      quantity: 1,
      totalPrice: 999
    })
  })

  it('should increase quantity when adding the same item', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper })

    const mockItem = {
      id: 'test-123',
      name: 'Test Phone',
      price: 999,
      imageUrl: 'test.jpg',
      capacity: '128GB',
      colorName: 'Black'
    }

    // Add item to cart
    act(() => {
      result.current.addToCart(mockItem)
    })

    // Check initial state
    expect(result.current.state.cart).toHaveLength(1)

    // Add the same item again
    act(() => {
      result.current.addToCart({ ...mockItem })
    })

    // Check if cart has only one item with quantity 2
    expect(result.current.state.cart).toHaveLength(1)
    expect(result.current.state.cart[0].quantity).toBe(2)
    expect(result.current.state.cart[0].totalPrice).toBe(1998)
  })

  it('should decrease quantity when called decreaseQuantity', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper })

    const mockItem = {
      id: 'test-123',
      name: 'Test Phone',
      price: 999,
      imageUrl: 'test.jpg',
      capacity: '128GB',
      colorName: 'Black'
    }

    // Add item to cart twice
    act(() => {
      result.current.addToCart(mockItem)
    })

    expect(result.current.state.cart).toHaveLength(1)

    // Add the same item again
    act(() => {
      result.current.addToCart({ ...mockItem })
    })

    // Verify we have one item with quantity 2
    expect(result.current.state.cart).toHaveLength(1)
    expect(result.current.state.cart[0].quantity).toBe(2)

    // Decrease quantity
    act(() => {
      result.current.decreaseQuantity('test-123')
    })

    // Check if quantity decreased to 1
    expect(result.current.state.cart).toHaveLength(1)
    expect(result.current.state.cart[0].quantity).toBe(1)
    expect(result.current.state.cart[0].totalPrice).toBe(999)
  })

  it('should remove item when decreaseQuantity is called and quantity is 1', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper })

    const mockItem = {
      id: 'test-123',
      name: 'Test Phone',
      price: 999,
      imageUrl: 'test.jpg',
      capacity: '128GB',
      colorName: 'Black'
    }

    // Add item to cart
    act(() => {
      result.current.addToCart(mockItem)
    })

    // Check initial state
    expect(result.current.state.cart).toHaveLength(1)

    // Decrease quantity
    act(() => {
      result.current.decreaseQuantity('test-123')
    })

    // Check if item was removed
    expect(result.current.state.cart).toHaveLength(0)
  })

  it('should remove an item from cart', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper })

    const mockItem = {
      id: 'test-123',
      name: 'Test Phone',
      price: 999,
      imageUrl: 'test.jpg',
      capacity: '128GB',
      colorName: 'Black'
    }

    // Add item to cart
    act(() => {
      result.current.addToCart(mockItem)
    })

    // Check initial state
    expect(result.current.state.cart).toHaveLength(1)

    // Remove item
    act(() => {
      result.current.removeFromCart('test-123')
    })

    // Check if cart is empty
    expect(result.current.state.cart).toHaveLength(0)
  })

  it('should clear the cart', () => {
    const { result } = renderHook(() => useProductContext(), { wrapper })

    const mockItem1 = {
      id: 'test-123',
      name: 'Test Phone 1',
      price: 999,
      imageUrl: 'test1.jpg',
      capacity: '128GB',
      colorName: 'Black'
    }

    const mockItem2 = {
      id: 'test-456',
      name: 'Test Phone 2',
      price: 1299,
      imageUrl: 'test2.jpg',
      capacity: '256GB',
      colorName: 'White'
    }

    // Add items to cart
    act(() => {
      result.current.addToCart(mockItem1)
      result.current.addToCart(mockItem2)
    })

    // Check initial state
    expect(result.current.state.cart).toHaveLength(2)

    // Clear cart
    act(() => {
      result.current.clearCart()
    })

    // Check if cart is empty
    expect(result.current.state.cart).toHaveLength(0)
  })
})
