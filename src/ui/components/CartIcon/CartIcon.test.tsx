import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CartIcon } from './CartIcon'
import * as productContextModule from '../../stores/productContext'

// Mock images
vi.mock('/Bagicon.svg', () => ({ default: 'empty-cart-icon-url' }))
vi.mock('/BagiconF.svg', () => ({ default: 'filled-cart-icon-url' }))

describe('CartIcon Component', () => {
  it('should display empty cart icon when cart is empty', () => {
    // Mock useProductContext to return an empty cart
    vi.spyOn(productContextModule, 'useProductContext').mockImplementation(() => ({
      state: {
        items: [],
        selected: null,
        loading: false,
        error: null,
        cart: []
      },
      getProducts: vi.fn(),
      getProductById: vi.fn(),
      clearSelected: vi.fn(),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      decreaseQuantity: vi.fn(),
      clearCart: vi.fn()
    }))

    render(<CartIcon />)

    // Check if badge shows 0
    expect(screen.getByText('0')).toBeInTheDocument()

    // Check if empty cart icon is used
    const icon = screen.getByAltText('Cart')
    expect(icon).toBeInTheDocument()
    expect(icon.getAttribute('src')).toBe('empty-cart-icon-url')
  })

  it('should display filled cart icon when cart has items', () => {
    // Mock useProductContext to return a cart with items
    vi.spyOn(productContextModule, 'useProductContext').mockImplementation(() => ({
      state: {
        items: [],
        selected: null,
        loading: false,
        error: null,
        cart: [
          {
            id: 'test-123',
            name: 'Test Phone',
            price: 999,
            imageUrl: 'test.jpg',
            capacity: '128GB',
            colorName: 'Black',
            quantity: 1,
            totalPrice: 999
          }
        ]
      },
      getProducts: vi.fn(),
      getProductById: vi.fn(),
      clearSelected: vi.fn(),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      decreaseQuantity: vi.fn(),
      clearCart: vi.fn()
    }))

    render(<CartIcon />)

    // Check if badge shows 1
    expect(screen.getByText('1')).toBeInTheDocument()

    // Check if filled cart icon is used
    const icon = screen.getByAltText('Cart')
    expect(icon).toBeInTheDocument()
    expect(icon.getAttribute('src')).toBe('filled-cart-icon-url')
  })

  it('should display correct count for multiple items', () => {
    // Mock useProductContext to return a cart with multiple items
    vi.spyOn(productContextModule, 'useProductContext').mockImplementation(() => ({
      state: {
        items: [],
        selected: null,
        loading: false,
        error: null,
        cart: [
          {
            id: 'test-123',
            name: 'Test Phone 1',
            price: 999,
            imageUrl: 'test1.jpg',
            capacity: '128GB',
            colorName: 'Black',
            quantity: 1,
            totalPrice: 999
          },
          {
            id: 'test-456',
            name: 'Test Phone 2',
            price: 1299,
            imageUrl: 'test2.jpg',
            capacity: '256GB',
            colorName: 'White',
            quantity: 2,
            totalPrice: 2598
          }
        ]
      },
      getProducts: vi.fn(),
      getProductById: vi.fn(),
      clearSelected: vi.fn(),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      decreaseQuantity: vi.fn(),
      clearCart: vi.fn()
    }))

    render(<CartIcon />)

    // Check if badge shows 2 (the number of items in the cart, not quantities)
    expect(screen.getByText('2')).toBeInTheDocument()

    // Check if filled cart icon is used
    const icon = screen.getByAltText('Cart')
    expect(icon).toBeInTheDocument()
    expect(icon.getAttribute('src')).toBe('filled-cart-icon-url')
  })
})
