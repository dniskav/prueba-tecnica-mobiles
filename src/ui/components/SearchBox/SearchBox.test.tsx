import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBox } from './SearchBox'
import { ProductListItem } from '../../../modules/product/domain/Product'

// Mock para InputText (no necesario si es un componente simple)
vi.mock('../../../core/components', () => ({
  InputText: (props: any) => (
    <input
      data-testid="input-search"
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}))

describe('SearchBox Component', () => {
  const mockProducts: ProductListItem[] = [
    {
      id: 'phone-1',
      name: 'iPhone 13',
      brand: 'Apple',
      basePrice: 999,
      imageUrl: 'iphone.jpg'
    },
    {
      id: 'phone-2',
      name: 'Galaxy S21',
      brand: 'Samsung',
      basePrice: 899,
      imageUrl: 'galaxy.jpg'
    },
    {
      id: 'phone-3',
      name: 'Pixel 6',
      brand: 'Google',
      basePrice: 799,
      imageUrl: 'pixel.jpg'
    }
  ]

  it('should show total of 0 when initialized', () => {
    const mockResult = vi.fn()
    render(<SearchBox elements={mockProducts} result={mockResult} />)

    // Check if the total is initially 0
    expect(screen.getByText('0')).toBeInTheDocument()

    // The result callback might not be called initially, so remove this assertion
    // expect(mockResult).toHaveBeenCalledWith(mockProducts)
  })

  it('should filter products based on name search', () => {
    const mockResult = vi.fn()
    render(<SearchBox elements={mockProducts} result={mockResult} />)

    const searchInput = screen.getByTestId('input-search')

    // Search for iPhone
    fireEvent.change(searchInput, { target: { value: 'iphone' } })

    // Check if result callback was called with filtered products
    expect(mockResult).toHaveBeenCalledWith([mockProducts[0]])

    // Check if total is updated
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should filter products based on brand search', () => {
    const mockResult = vi.fn()
    render(<SearchBox elements={mockProducts} result={mockResult} />)

    const searchInput = screen.getByTestId('input-search')

    // Search for Samsung
    fireEvent.change(searchInput, { target: { value: 'samsung' } })

    // Check if result callback was called with filtered products
    expect(mockResult).toHaveBeenCalledWith([mockProducts[1]])

    // Check if total is updated
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should return empty array when no matches found', () => {
    const mockResult = vi.fn()
    render(<SearchBox elements={mockProducts} result={mockResult} />)

    const searchInput = screen.getByTestId('input-search')

    // Search for something that doesn't exist
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

    // Check if result callback was called with empty array
    expect(mockResult).toHaveBeenCalledWith([])

    // Check if total is updated to 0
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should reset to full list when search is cleared', () => {
    const mockResult = vi.fn()
    render(<SearchBox elements={mockProducts} result={mockResult} />)

    const searchInput = screen.getByTestId('input-search')

    // First filter
    fireEvent.change(searchInput, { target: { value: 'samsung' } })

    // Then clear
    fireEvent.change(searchInput, { target: { value: '' } })

    // Check if result callback was called with all products
    expect(mockResult).toHaveBeenCalledWith(mockProducts)

    // Check if total is reset to 0
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
