import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductService } from './ProductService'
import { ProductRepository } from '../infrastructure/ProductRepository'
import { ProductListItem, ProductDetail } from '../domain/Product'

// Mockear ProductRepository
vi.mock('../infrastructure/ProductRepository', () => ({
  ProductRepository: {
    getAll: vi.fn(),
    getById: vi.fn()
  }
}))

describe('ProductService', () => {
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
    it('should return all products from repository', async () => {
      // Arrange
      vi.mocked(ProductRepository.getAll).mockResolvedValue(mockProductList)

      // Act
      const result = await ProductService.getAll(undefined)

      // Assert
      expect(ProductRepository.getAll).toHaveBeenCalledWith(undefined)
      expect(result).toEqual(mockProductList)
      expect(result).toHaveLength(2)
    })

    it('should pass search parameter to repository', async () => {
      // Arrange
      const searchTerm = 'iphone'
      const filteredProducts = [mockProductList[0]]
      vi.mocked(ProductRepository.getAll).mockResolvedValue(filteredProducts)

      // Act
      const result = await ProductService.getAll(searchTerm)

      // Assert
      expect(ProductRepository.getAll).toHaveBeenCalledWith(searchTerm)
      expect(result).toEqual(filteredProducts)
      expect(result).toHaveLength(1)
    })
  })

  describe('getById', () => {
    it('should return product detail with formatted price', async () => {
      // Arrange
      vi.mocked(ProductRepository.getById).mockResolvedValue(mockProductDetail)

      // Act
      const result = await ProductService.getById('1')

      // Assert
      expect(ProductRepository.getById).toHaveBeenCalledWith('1')
      expect(result).toEqual({
        ...mockProductDetail,
        formattedPrice: '$999.00'
      })
    })

    it('should return null when product is not found', async () => {
      // Arrange
      vi.mocked(ProductRepository.getById).mockResolvedValue(null)

      // Act
      const result = await ProductService.getById('999')

      // Assert
      expect(ProductRepository.getById).toHaveBeenCalledWith('999')
      expect(result).toBeNull()
    })
  })
})
