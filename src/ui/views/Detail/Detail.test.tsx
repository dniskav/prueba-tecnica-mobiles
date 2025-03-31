import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { Detail } from './Detail'
import { renderWithProviders } from '../../../test/utils'
import * as productContextModule from '../../stores/productContext'

// Create the mock before using it
const navigateMock = vi.fn()

// Mock for useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: 'test-123' }),
    useNavigate: () => navigateMock
  }
})

// Mock for currency hook
vi.mock('../../../core/hooks', () => ({
  useCurrency: () => (value: number) => `€${value.toFixed(2)}`
}))

describe('Detail Component', () => {
  const mockSelected = {
    id: 'test-123',
    name: 'Test Phone',
    brand: 'Test Brand',
    description: 'Test description',
    basePrice: 999,
    discountPrice: null,
    imageUrl: 'test.jpg',
    rating: 4.5,
    colorOptions: [
      {
        name: 'Black',
        hexCode: '#000000',
        imageUrl: 'black.jpg'
      },
      {
        name: 'White',
        hexCode: '#FFFFFF',
        imageUrl: 'white.jpg'
      }
    ],
    storageOptions: [
      {
        capacity: '128GB',
        price: 999
      },
      {
        capacity: '256GB',
        price: 1199
      }
    ],
    specs: {
      display: 'Test display',
      processor: 'Test processor',
      storage: 'Test storage',
      camera: 'Test camera',
      screen: '6.1 inches',
      resolution: '2532 x 1170',
      mainCamera: '12 MP',
      selfieCamera: '12 MP',
      battery: '3240 mAh',
      os: 'iOS 15',
      weight: '174g',
      screenRefreshRate: '60 Hz'
    },
    similarProducts: []
  }

  const mockGetProductById = vi.fn()
  const mockClearSelected = vi.fn()
  const mockAddToCart = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    navigateMock.mockReset()

    // Mock the useProductContext
    vi.spyOn(productContextModule, 'useProductContext').mockImplementation(() => ({
      state: {
        items: [],
        selected: mockSelected,
        loading: false,
        error: null,
        cart: []
      },
      getProducts: vi.fn(),
      getProductById: mockGetProductById,
      clearSelected: mockClearSelected,
      addToCart: mockAddToCart,
      removeFromCart: vi.fn(),
      decreaseQuantity: vi.fn(),
      clearCart: vi.fn()
    }))
  })

  it('should load product details and set default selections', async () => {
    renderWithProviders(<Detail />)

    // Verify that getProductById was called with the correct ID
    expect(mockGetProductById).toHaveBeenCalledWith('test-123')

    // Verify that the product name is displayed
    expect(screen.getByText('Test Phone')).toBeInTheDocument()

    // Verify that capacity options are displayed
    expect(screen.getByText('128GB')).toBeInTheDocument()
    expect(screen.getByText('256GB')).toBeInTheDocument()

    // Verify that the default color is the first one (Black)
    expect(screen.getByText('Black')).toBeInTheDocument()

    // Verify that the add button is initially disabled
    // (because no capacity is selected by default)
    const addButton = screen.getByRole('button', { name: /añadir/i })
    expect(addButton).toBeDisabled()
  })

  it('should enable add button when capacity is selected', async () => {
    const { user } = renderWithProviders(<Detail />)

    // Verify that the button is initially disabled
    const addButton = screen.getByRole('button', { name: /añadir/i })
    expect(addButton).toBeDisabled()

    // Select a capacity
    const capacityOption = screen.getByLabelText('128GB')
    await user.click(capacityOption)

    // Verify that the button is now enabled
    expect(addButton).not.toBeDisabled()
  })

  it('should add item to cart with correct properties when Add button is clicked', async () => {
    const { user } = renderWithProviders(<Detail />)

    // Select a capacity
    const capacityOption = screen.getByLabelText('128GB')
    await user.click(capacityOption)

    // Select a color - using value instead of label
    const colorOption = screen.getByDisplayValue('#FFFFFF')
    await user.click(colorOption)

    // Click add to cart button
    const addButton = screen.getByRole('button', { name: /añadir/i })
    await user.click(addButton)

    // Verify that addToCart was called with the correct parameters
    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith({
        id: 'test-123-128GB-#FFFFFF',
        name: 'Test Phone',
        price: 999,
        imageUrl: 'white.jpg',
        capacity: '128GB',
        colorName: 'White'
      })
    })

    // Verify that it navigated to the cart page
    expect(navigateMock).toHaveBeenCalledWith('/cart')
  })

  it('should display loading message when product is not loaded', () => {
    // Mock to simulate that no product is selected yet
    vi.spyOn(productContextModule, 'useProductContext').mockImplementation(() => ({
      state: {
        items: [],
        selected: null,
        loading: true,
        error: null,
        cart: []
      },
      getProducts: vi.fn(),
      getProductById: mockGetProductById,
      clearSelected: mockClearSelected,
      addToCart: mockAddToCart,
      removeFromCart: vi.fn(),
      decreaseQuantity: vi.fn(),
      clearCart: vi.fn()
    }))

    renderWithProviders(<Detail />)

    // Verify that the loading message is displayed
    expect(screen.getByText(/cargando producto/i)).toBeInTheDocument()
  })
})
