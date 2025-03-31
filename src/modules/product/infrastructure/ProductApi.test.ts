import { describe, it, expect } from 'vitest'
import { removeDuplicates } from './ProductApi'
import { ProductListItem } from '../domain/Product'

describe('ProductApi', () => {
  describe('removeDuplicates', () => {
    it('should remove duplicate products by id', () => {
      // Arrange
      const products: ProductListItem[] = [
        {
          id: '1',
          name: 'Product 1',
          brand: 'Brand A',
          basePrice: 100,
          imageUrl: 'image1.jpg'
        },
        {
          id: '2',
          name: 'Product 2',
          brand: 'Brand B',
          basePrice: 200,
          imageUrl: 'image2.jpg'
        },
        {
          id: '1', // Duplicate ID
          name: 'Product 1 - Updated',
          brand: 'Brand A',
          basePrice: 150,
          imageUrl: 'image1-updated.jpg'
        },
        {
          id: '3',
          name: 'Product 3',
          brand: 'Brand C',
          basePrice: 300,
          imageUrl: 'image3.jpg'
        }
      ]

      // Act
      const result = removeDuplicates(products)

      // Assert
      expect(result).toHaveLength(3) // Should have 3 unique products
      expect(result.map((p) => p.id).sort()).toEqual(['1', '2', '3']) // Should have these IDs

      // The last duplicate should be kept
      const product1 = result.find((p) => p.id === '1')
      expect(product1?.name).toBe('Product 1 - Updated')
      expect(product1?.basePrice).toBe(150)
    })

    it('should return an empty array when input is empty', () => {
      // Arrange
      const products: ProductListItem[] = []

      // Act
      const result = removeDuplicates(products)

      // Assert
      expect(result).toHaveLength(0)
      expect(result).toEqual([])
    })

    it('should keep all products when there are no duplicates', () => {
      // Arrange
      const products: ProductListItem[] = [
        {
          id: '1',
          name: 'Product 1',
          brand: 'Brand A',
          basePrice: 100,
          imageUrl: 'image1.jpg'
        },
        {
          id: '2',
          name: 'Product 2',
          brand: 'Brand B',
          basePrice: 200,
          imageUrl: 'image2.jpg'
        },
        {
          id: '3',
          name: 'Product 3',
          brand: 'Brand C',
          basePrice: 300,
          imageUrl: 'image3.jpg'
        }
      ]

      // Act
      const result = removeDuplicates(products)

      // Assert
      expect(result).toHaveLength(3)
      expect(result).toEqual(products)
    })
  })
})
