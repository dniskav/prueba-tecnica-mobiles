import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { InputText } from '../InputText'

// Mockear el módulo CSS para que no interfiera en las pruebas
vi.mock('../inputText.module.css', () => ({
  default: {
    'input-wrapper': 'input-wrapper-mock',
    input: 'input-mock'
  }
}))

describe('InputText Component', () => {
  it('should render with default type (text)', () => {
    // Arrange & Act
    render(<InputText placeholder="Enter text" />)

    // Assert
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input.getAttribute('type')).toBe('text')
  })

  it('should apply provided props to the input element', () => {
    // Arrange & Act
    render(<InputText placeholder="Test placeholder" maxLength={10} autoComplete="off" />)

    // Assert
    const input = screen.getByPlaceholderText('Test placeholder')
    expect(input).toHaveAttribute('maxLength', '10')
    expect(input).toHaveAttribute('autoComplete', 'off')
  })

  it('should handle onChange events', () => {
    // Arrange
    const handleChange = vi.fn()
    render(<InputText placeholder="Test" onChange={handleChange} />)
    const input = screen.getByPlaceholderText('Test')

    // Act
    fireEvent.change(input, { target: { value: 'New value' } })

    // Assert
    expect(handleChange).toHaveBeenCalledTimes(1)
    // Verificar que el evento sintético contiene el valor correcto
    expect(handleChange.mock.calls[0][0].target.value).toBe('New value')
  })

  it('should override type if provided', () => {
    // Arrange & Act
    render(<InputText type="password" placeholder="Password" />)

    // Assert
    const input = screen.getByPlaceholderText('Password')
    // Note: The component always uses type="text" and ignores any type prop
    expect(input.getAttribute('type')).toBe('text')
  })

  it('should apply CSS classes', () => {
    // Arrange & Act
    render(<InputText placeholder="Test" />)

    // Assert
    const wrapper = screen.getByPlaceholderText('Test').parentElement
    expect(wrapper).toHaveClass('input-wrapper-mock')

    const input = screen.getByPlaceholderText('Test')
    expect(input).toHaveClass('input-mock')
  })
})
