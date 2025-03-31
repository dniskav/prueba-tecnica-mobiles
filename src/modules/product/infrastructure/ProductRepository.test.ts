import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductRepository } from './ProductRepository'
import { fetchProducts, fetchProductById } from './ProductApi'
import { ProductListItem, ProductDetail } from '../domain/Product'

// Mockear ProductApi
vi.mock('./ProductApi', () => ({
  fetchProducts: vi.fn(),
  fetchProductById: vi.fn()
}))

describe('ProductRepository', () => {
  const mockProductList: ProductListItem[] = [
    {
      id: '1',
      name: 'iPhone 13',
      brand: 'Apple',
      basePrice: 999,
      imageUrl: 'iphone.jpg'
    },
    {
      id: '2',
      name: 'Galaxy S21',
      brand: 'Samsung',
      basePrice: 899,
      imageUrl: 'galaxy.jpg'
    }
  ]

  const mockProductDetail: ProductDetail = {
    id: '1',
    name: 'iPhone 13',
    brand: 'Apple',
    basePrice: 999,
    imageUrl: 'iphone.jpg',
    description: 'Apple iPhone 13 with A15 chip',
    rating: 4.8,
    specs: {
      screen: '6.1 inches',
      resolution: '2532 x 1170',
      processor: 'A15 Bionic',
      mainCamera: '12 MP',
      selfieCamera: '12 MP',
      battery: '3240 mAh',
      os: 'iOS 15',
      screenRefreshRate: '60 Hz'
    },
    colorOptions: [
      { name: 'Black', hexCode: '#000000', imageUrl: 'iphone-black.jpg' },
      { name: 'Blue', hexCode: '#0000FF', imageUrl: 'iphone-blue.jpg' }
    ],
    storageOptions: [
      { capacity: '128GB', price: 999 },
      { capacity: '256GB', price: 1099 }
    ],
    similarProducts: []
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('getAll', () => {
    it('should return all products', async () => {
      // Arrange
      vi.mocked(fetchProducts).mockResolvedValue(mockProductList)

      // Act
      const result = await ProductRepository.getAll()

      // Assert
      expect(fetchProducts).toHaveBeenCalledWith(undefined)
      expect(result).toEqual(mockProductList)
    })

    it('should pass search parameter to fetchProducts', async () => {
      // Arrange
      const searchTerm = 'iphone'
      const filteredProducts = [mockProductList[0]]
      vi.mocked(fetchProducts).mockResolvedValue(filteredProducts)

      // Act
      const result = await ProductRepository.getAll(searchTerm)

      // Assert
      expect(fetchProducts).toHaveBeenCalledWith(searchTerm)
      expect(result).toEqual(filteredProducts)
    })
  })

  describe('getById', () => {
    it('should return product detail when found', async () => {
      // Arrange
      vi.mocked(fetchProductById).mockResolvedValue(mockProductDetail)

      // Act
      const result = await ProductRepository.getById('1')

      // Assert
      expect(fetchProductById).toHaveBeenCalledWith('1')
      expect(result).toEqual(mockProductDetail)
    })

    it('should return null when product is not found', async () => {
      // Arrange
      vi.mocked(fetchProductById).mockResolvedValue(null)

      // Act
      const result = await ProductRepository.getById('999')

      // Assert
      expect(fetchProductById).toHaveBeenCalledWith('999')
      expect(result).toBeNull()
    })
  })
})
