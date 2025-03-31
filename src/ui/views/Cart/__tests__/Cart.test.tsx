import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { Cart } from '../Cart'
import { renderWithProviders } from '../../../../test/utils'
import * as productContextModule from '../../../stores/productContext'

// Create the mock before using it
const navigateMock = vi.fn()

// Mock for useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock
  }
})

// Mock for currency hook
vi.mock('../../../../core/hooks', () => ({
  useCurrency: () => (value: number) => `€${value.toFixed(2)}`
}))

describe('Cart Component', () => {
  it('should display empty cart message when cart is empty', () => {
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

    renderWithProviders(<Cart />)

    expect(screen.getByText('CART (0)')).toBeInTheDocument()
    expect(screen.queryByText('TOTAL')).not.toBeInTheDocument()

    // Use getAllByText instead of getByText since there are multiple buttons with the same text
    expect(screen.getAllByText('CONTINUE SHOPPING').length).toBeGreaterThan(0)
    expect(screen.queryByText('PAY')).not.toBeInTheDocument()
  })

  it('should display cart items when cart is not empty', async () => {
    // Mock cart with products
    const mockCart = [
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

    // Mock useProductContext to return a cart with products
    vi.spyOn(productContextModule, 'useProductContext').mockImplementation(() => ({
      state: {
        items: [],
        selected: null,
        loading: false,
        error: null,
        cart: mockCart
      },
      getProducts: vi.fn(),
      getProductById: vi.fn(),
      clearSelected: vi.fn(),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      decreaseQuantity: vi.fn(),
      clearCart: vi.fn()
    }))

    renderWithProviders(<Cart />)

    // Verify title with correct number of items
    expect(screen.getByText('CART (3)')).toBeInTheDocument()

    // Verify product names are displayed
    expect(screen.getByText('Test Phone 1')).toBeInTheDocument()
    expect(screen.getByText('Test Phone 2')).toBeInTheDocument()

    // Verify configuration (capacity and color)
    expect(screen.getByText('128GB | Black')).toBeInTheDocument()
    expect(screen.getByText('256GB | White')).toBeInTheDocument()

    // Verify prices
    expect(screen.getByText('€999.00')).toBeInTheDocument()
    expect(screen.getByText('€1299.00')).toBeInTheDocument()

    // Verify quantity of second product (2)
    const quantityDisplays = screen.getAllByText('2')
    expect(quantityDisplays.length).toBeGreaterThan(0)

    // Verify total price of second product
    expect(screen.getByText('Total: €2598.00')).toBeInTheDocument()

    // Verify buttons (use getAllByText since there are duplicates)
    expect(screen.getAllByText('CONTINUE SHOPPING').length).toBeGreaterThan(0)
    expect(screen.getAllByText('PAY').length).toBeGreaterThan(0)

    // Verify general total
    expect(screen.getAllByText('TOTAL').length).toBeGreaterThan(0)
    expect(screen.getAllByText('€3597.00').length).toBeGreaterThan(0) // 999 + 2598
  })

  it('should call navigation function when continue shopping is clicked', async () => {
    // Reset navigateMock before the test
    navigateMock.mockReset()

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

    const { user } = renderWithProviders(<Cart />)

    // Click on continue shopping (use the first desktop button)
    const continueButtons = screen.getAllByText('CONTINUE SHOPPING')
    await user.click(continueButtons[0])

    // Verify that navigate was called with the correct route
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/')
    })
  })
})
