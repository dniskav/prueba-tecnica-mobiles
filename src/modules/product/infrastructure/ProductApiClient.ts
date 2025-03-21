import { apiFetch } from '../../../core/infrastructure/apiFetch'

/**
 * Product-specific API client that wraps the core fetch service.
 * This allows extending, modifying, or handling errors specific to the Product module.
 */
export const productApiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    return await apiFetch<T>(`/products${endpoint}`, options)
  } catch (error) {
    console.error(`Product API Error: ${error}`)
    throw error
  }
}
