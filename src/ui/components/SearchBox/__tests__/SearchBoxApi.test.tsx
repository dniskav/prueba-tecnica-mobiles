import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBoxApi } from '../SearchBoxApi'

// Mock the InputText component
vi.mock('../../../../core/components', () => ({
  InputText: ({
    onChange,
    placeholder
  }: {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    placeholder: string
  }) => <input data-testid="mock-input" onChange={onChange} placeholder={placeholder} />
}))

describe('SearchBoxApi Component', () => {
  it('should render with the correct placeholder', () => {
    const mockResult = vi.fn()
    render(<SearchBoxApi quantity={0} result={mockResult} />)

    const input = screen.getByTestId('mock-input')
    expect(input).toHaveAttribute('placeholder', 'Search for a smartphone...')
  })

  it('should display the correct quantity of results', () => {
    const mockResult = vi.fn()
    render(<SearchBoxApi quantity={5} result={mockResult} />)

    expect(screen.getByText('5 Results')).toBeInTheDocument()
  })

  it('should call result function with search query when input changes', () => {
    const mockResult = vi.fn()
    render(<SearchBoxApi quantity={0} result={mockResult} />)

    const input = screen.getByTestId('mock-input')
    fireEvent.change(input, { target: { value: 'iphone' } })

    expect(mockResult).toHaveBeenCalledWith('iphone')
  })

  it('should update the results count when quantity prop changes', () => {
    const mockResult = vi.fn()
    const { rerender } = render(<SearchBoxApi quantity={0} result={mockResult} />)

    expect(screen.getByText('0 Results')).toBeInTheDocument()

    // Rerender with a different quantity
    rerender(<SearchBoxApi quantity={10} result={mockResult} />)

    expect(screen.getByText('10 Results')).toBeInTheDocument()
  })
})
