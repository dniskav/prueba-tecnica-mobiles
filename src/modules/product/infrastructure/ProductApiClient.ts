import { apiFetch } from '../../../core/infrastructure/apiFetch'
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
