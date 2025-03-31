import { useState, useEffect } from 'react'

/**
 * Custom hook for persisting state in localStorage
 *
 * @param key The localStorage key
 * @param initialValue The initial value if nothing is stored
 * @returns A stateful value and a function to update it, similar to useState
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from localStorage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error, return initialValue
      console.error('Error reading from localStorage', error)
      return initialValue
    }
  })

  // Update localStorage when storedValue changes
  useEffect(() => {
    try {
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      // Log errors in case of issues with localStorage
      console.error('Error writing to localStorage', error)
    }
  }, [key, storedValue])

  // Return a wrapped version of useState's setter function that also updates localStorage
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
    } catch (error) {
      console.error('Error setting value in localStorage hook', error)
    }
  }

  return [storedValue, setValue]
}
