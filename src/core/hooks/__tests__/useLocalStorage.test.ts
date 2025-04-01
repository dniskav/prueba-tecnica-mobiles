import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  // Mock de localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {}
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
      clear: vi.fn(() => {
        store = {}
      })
    }
  })()

  // Reemplazar el localStorage global con nuestro mock
  beforeEach(() => {
    vi.resetAllMocks()
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    })
  })

  it('should initialize with the provided initial value when localStorage is empty', () => {
    // Arrange & Act
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'))

    // Assert
    expect(result.current[0]).toBe('initialValue')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('testKey')
  })

  it('should use the value from localStorage if it exists', () => {
    // Arrange
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify('storedValue'))

    // Act
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'))

    // Assert
    expect(result.current[0]).toBe('storedValue')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('testKey')
  })

  it('should update the state and localStorage when setValue is called', () => {
    // Arrange
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'))

    // Act
    act(() => {
      result.current[1]('newValue')
    })

    // Assert
    expect(result.current[0]).toBe('newValue')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'))
  })

  it('should handle objects as values', () => {
    // Arrange
    const initialObject = { name: 'Test', value: 123 }
    const { result } = renderHook(() => useLocalStorage('testKey', initialObject))

    // Act
    const newObject = { name: 'Updated', value: 456 }
    act(() => {
      result.current[1](newObject)
    })

    // Assert
    expect(result.current[0]).toEqual(newObject)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(newObject))
  })

  it('should use initialValue if there is an error reading from localStorage', () => {
    // Arrange
    localStorageMock.getItem.mockImplementationOnce(() => {
      throw new Error('Read error')
    })
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    const { result } = renderHook(() => useLocalStorage('testKey', 'fallbackValue'))

    // Assert
    expect(result.current[0]).toBe('fallbackValue')
    expect(consoleSpy).toHaveBeenCalledWith('Error reading from localStorage', expect.any(Error))
  })

  it('should handle errors when writing to localStorage', () => {
    // Arrange
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('Write error')
    })
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    renderHook(() => useLocalStorage('testKey', 'initialValue'))

    // Assert
    // This test only focuses on verifying that the error is handled correctly
    // and not on the specific value, which may vary depending on the implementation
    expect(consoleSpy).toHaveBeenCalledWith('Error writing to localStorage', expect.any(Error))
  })
})
