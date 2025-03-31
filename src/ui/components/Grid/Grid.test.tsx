import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Grid } from './Grid'
import { ProductListItem } from '../../../modules/product/domain/Product'
import { BrowserRouter } from 'react-router-dom'

// Mock para el componente Card
vi.mock('../Card/Card', () => ({
  Card: ({ item }: { item: ProductListItem }) => (
    <div data-testid={`card-${item.id}`}>
      <p>{item.name}</p>
      <p>{item.brand}</p>
    </div>
  )
}))

// Mock para el hook useCurrency (usado en Card)
vi.mock('../../../core/hooks', () => ({
  useCurrency: () => (value: number) => `€${value.toFixed(2)}`
}))

describe('Grid Component', () => {
  it('should render empty grid when no items are provided', () => {
    render(
      <BrowserRouter>
        <Grid items={[]} />
      </BrowserRouter>
    )

    // Verify there are no link elements inside the grid
    const links = screen.queryAllByRole('link')
    expect(links).toHaveLength(0)
  })

  it('should render cards for each product item', () => {
    const mockItems: ProductListItem[] = [
      {
        id: 'test-123',
        name: 'Test Phone 1',
        brand: 'Brand A',
        basePrice: 999,
        imageUrl: 'test1.jpg'
      },
      {
        id: 'test-456',
        name: 'Test Phone 2',
        brand: 'Brand B',
        basePrice: 1299,
        imageUrl: 'test2.jpg'
      }
    ]

    render(
      <BrowserRouter>
        <Grid items={mockItems} />
      </BrowserRouter>
    )

    // Verify product names are displayed (via mocked Card)
    expect(screen.getByText('Test Phone 1')).toBeInTheDocument()
    expect(screen.getByText('Test Phone 2')).toBeInTheDocument()

    // Verify brands are displayed (via mocked Card)
    expect(screen.getByText('Brand A')).toBeInTheDocument()
    expect(screen.getByText('Brand B')).toBeInTheDocument()

    // Verify links are created with correct URLs
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/detail/test-123')
    expect(links[1]).toHaveAttribute('href', '/detail/test-456')
  })
})
