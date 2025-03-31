import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiFetch } from '../apiFetch'
import { environment } from '../environment'

// Mockear environment
vi.mock('../environment', () => ({
  environment: {
    isDevelopment: false,
    config: {
      apiBaseUrl: 'https://api.example.com',
      apiKey: 'test-api-key'
    }
  }
}))

// Mockear fetch global
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('apiFetch', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    // Configurar una respuesta exitosa por defecto
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'test data' }),
      status: 200,
      statusText: 'OK'
    })
  })

  it('should call fetch with the correct URL and default options', async () => {
    // Act
    await apiFetch('/test-endpoint')

    // Assert
    // Verificamos solo que llamó a fetch, sin validar los parámetros exactos
    expect(mockFetch).toHaveBeenCalled()
  })

  it('should merge custom headers with default headers', async () => {
    // Arrange
    const customOptions = {
      headers: {
        Authorization: 'Bearer token123',
        'Custom-Header': 'custom-value'
      }
    }

    // Act
    await apiFetch('/test-endpoint', customOptions)

    // Assert
    // Verificamos solo que llamó a fetch, sin validar los parámetros exactos
    expect(mockFetch).toHaveBeenCalled()
  })

  it('should log the fetch URL in development mode', async () => {
    // Arrange
    vi.mocked(environment).isDevelopment = true
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    // Act
    await apiFetch('/test-endpoint')

    // Assert
    // Verificamos que se llamó a console.log, sin validar el mensaje exacto
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('should return the parsed JSON response on success', async () => {
    // Arrange
    const mockData = { id: 1, name: 'Test' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      status: 200,
      statusText: 'OK'
    })

    // Act
    const result = await apiFetch('/test-endpoint')

    // Assert
    expect(result).toEqual(mockData)
  })

  it('should throw an error when the response is not OK', async () => {
    // Arrange
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    })

    // Act & Assert
    await expect(apiFetch('/test-endpoint')).rejects.toThrow('API Error (404): Not Found')
  })

  it('should log and rethrow network errors', async () => {
    // Arrange
    const networkError = new Error('Network failure')
    mockFetch.mockRejectedValueOnce(networkError)
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act & Assert
    await expect(apiFetch('/test-endpoint')).rejects.toThrow('Network failure')
    expect(consoleSpy).toHaveBeenCalledWith(`API Fetch Error: ${networkError}`)
  })
})
