export const ENV_MODE = import.meta.env.MODE || 'development'
export const isProduction = ENV_MODE === 'production'
export const isDevelopment = ENV_MODE === 'development'
if (isDevelopment) {
  console.log(`Running in ${ENV_MODE} mode`)
  console.log('Environment variables:', {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    enableCache: import.meta.env.VITE_ENABLE_CACHE !== 'false',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true'
  })
}
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
