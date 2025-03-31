import { environment } from './environment'
export const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const API_BASE_URL = environment.config.apiBaseUrl
  const API_KEY = environment.config.apiKey
  if (environment.isDevelopment) {
    console.log(`Fetching: ${API_BASE_URL}${endpoint}`)
  }
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        ...options.headers
      }
    })
    if (!response.ok) {
      throw new Error(`API Error (${response.status}): ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`API Fetch Error: ${error}`)
    throw error
  }
}
