import { describe, it, expect } from 'vitest'
import { useCurrency } from '../useCurrency'

describe('useCurrency', () => {
  it('should format a number as a currency with default parameters (EUR, es-ES, symbol)', () => {
    // Arrange
    const formatCurrency = useCurrency()

    // Act
    const result = formatCurrency(100)

    // Assert
    expect(result).toEqual(expect.stringContaining('100,00'))
    expect(result).toEqual(expect.stringContaining('€'))
  })

  it('should format a number as a currency with USD and en-US locale', () => {
    // Arrange
    const formatCurrency = useCurrency('USD', 'en-US')

    // Act
    const result = formatCurrency(100)

    // Assert
    expect(result).toEqual('$100.00')
  })

  it('should format a number as a currency with code display', () => {
    // Arrange
    const formatCurrency = useCurrency('USD', 'en-US', 'code')

    // Act
    const result = formatCurrency(100)

    // Assert
    expect(result).toEqual(expect.stringContaining('USD'))
    expect(result).toEqual(expect.stringContaining('100.00'))
  })

  it('should format a number as a currency with name display', () => {
    // Arrange
    const formatCurrency = useCurrency('USD', 'en-US', 'name')

    // Act
    const result = formatCurrency(100)

    // Assert
    expect(result).toEqual('100.00 US dollars')
  })

  it('should format decimal numbers correctly', () => {
    // Arrange
    const formatCurrency = useCurrency('EUR', 'en-US')

    // Act
    const result = formatCurrency(99.99)

    // Assert
    expect(result).toEqual('€99.99')
  })
})
