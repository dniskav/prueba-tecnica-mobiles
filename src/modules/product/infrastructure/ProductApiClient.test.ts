import { describe, it, expect, vi, beforeEach } from 'vitest'
import { productApiFetch } from './ProductApiClient'
import { apiFetch } from '../../../core/infrastructure/apiFetch'

// Mockear apiFetch
vi.mock('../../../core/infrastructure/apiFetch', () => ({
  apiFetch: vi.fn()
}))

describe('ProductApiClient', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should call apiFetch with correct endpoint', async () => {
    // Arrange
    const mockData = { id: '1', name: 'Test Product' }
    vi.mocked(apiFetch).mockResolvedValue(mockData)

    // Act
    const result = await productApiFetch('/test')

    // Assert
    expect(apiFetch).toHaveBeenCalledWith('/products/test', {})
    expect(result).toEqual(mockData)
  })

  it('should pass options to apiFetch', async () => {
    // Arrange
    const mockData = { id: '1', name: 'Test Product' }
    const options = { method: 'POST', body: JSON.stringify({ test: true }) }
    vi.mocked(apiFetch).mockResolvedValue(mockData)

    // Act
    const result = await productApiFetch('/test', options)

    // Assert
    expect(apiFetch).toHaveBeenCalledWith('/products/test', options)
    expect(result).toEqual(mockData)
  })

  it('should handle errors from apiFetch', async () => {
    // Arrange
    const mockError = new Error('Network error')
    vi.mocked(apiFetch).mockRejectedValue(mockError)

    // Mock console.error to prevent test output pollution
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act & Assert
    await expect(productApiFetch('/test')).rejects.toThrow('Network error')
    expect(consoleSpy).toHaveBeenCalledWith(`Product API Error: ${mockError}`)
  })
})
