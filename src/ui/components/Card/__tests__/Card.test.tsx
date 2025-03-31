import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '../Card'
import { ProductListItem } from '../../../../modules/product/domain/Product'

// Mock para el hook useCurrency
vi.mock('../../../../core/hooks/useCurrency', () => ({
  useCurrency: () => (value: number) => `${value.toFixed(2).replace('.', ',')} EUR`
}))

describe('Card Component', () => {
  const mockProduct: ProductListItem = {
    id: 'test-123',
    name: 'Test Phone',
    brand: 'Test Brand',
    basePrice: 999,
    imageUrl: 'test.jpg'
  }

  it('should render product information correctly', () => {
    render(<Card item={mockProduct} />)

    // Check if product name is displayed
    expect(screen.getByText('Test Phone')).toBeInTheDocument()

    // Check if brand is displayed
    expect(screen.getByText('Test Brand')).toBeInTheDocument()

    // Check if price is formatted correctly
    expect(screen.getByText('999,00 EUR')).toBeInTheDocument()

    // Check if image is present with correct alt text
    const image = screen.getByAltText('Test Phone')
    expect(image).toBeInTheDocument()
    expect(image.getAttribute('src')).toBe('test.jpg')
  })

  it('should render with different product data', () => {
    const anotherProduct: ProductListItem = {
      id: 'test-456',
      name: 'Another Phone',
      brand: 'Another Brand',
      basePrice: 1299,
      imageUrl: 'another.jpg'
    }

    render(<Card item={anotherProduct} />)

    expect(screen.getByText('Another Phone')).toBeInTheDocument()
    expect(screen.getByText('Another Brand')).toBeInTheDocument()
    expect(screen.getByText('1299,00 EUR')).toBeInTheDocument()
  })
})
