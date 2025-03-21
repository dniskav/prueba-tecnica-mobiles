const API_BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com' // Base URL for the API

/**
 * Custom fetch wrapper to handle API calls with authentication and error handling
 * @param {string} endpoint - The API endpoint (e.g., "/products")
 * @param {RequestInit} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<T>} - The parsed JSON response
 */
export const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const API_KEY = import.meta.env.VITE_API_KEY // 🔥 Load API key from Vite environment variables

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY, // 🔥 Include API key in every request
        ...options.headers // Merge additional headers if provided
      }
    })

    if (!response.ok) {
      throw new Error(`API Error (${response.status}): ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API Fetch Error: ${error}`)
    throw error // Re-throw error for handling in services
  }
}
