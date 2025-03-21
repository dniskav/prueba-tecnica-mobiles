// Modelo para la lista de productos
export interface ProductListItem {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

// Modelo para opciones de color en el detalle
export interface ColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

// Modelo para opciones de almacenamiento
export interface StorageOption {
  capacity: string
  price: number
}

// Modelo para especificaciones técnicas
export interface ProductSpecs {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

// Modelo para el detalle de producto
export interface ProductDetail extends ProductListItem {
  description: string
  rating: number
  specs: ProductSpecs
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  similarProducts: ProductListItem[]
  formattedPrice?: string
}
