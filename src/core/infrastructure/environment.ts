/**
 * Environment utility to handle different execution modes (development, production)
 */

// Current environment mode
export const ENV_MODE = import.meta.env.MODE || 'development'

// Helper functions to check current environment
export const isProduction = ENV_MODE === 'production'
export const isDevelopment = ENV_MODE === 'development'

// Log environment info (only in development)
if (isDevelopment) {
  console.log(`Running in ${ENV_MODE} mode`)
  console.log('Environment variables:', {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    enableCache: import.meta.env.VITE_ENABLE_CACHE !== 'false',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true'
  })
}

// Export environment configuration for app use
export const environment = {
  mode: ENV_MODE,
  isProduction,
  isDevelopment,
  config: {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    apiKey: import.meta.env.VITE_API_KEY,
    features: {
      enableCache: import.meta.env.VITE_ENABLE_CACHE !== 'false',
      debugMode: import.meta.env.VITE_DEBUG_MODE === 'true'
    }
  }
}
