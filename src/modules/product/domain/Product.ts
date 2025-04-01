// Model for the product list
export interface ProductListItem {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

// Model for color options in detail view
export interface ColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

// Model for storage options
export interface StorageOption {
  capacity: string
  price: number
}

// Model for technical specifications
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

// Model for product detail
export interface ProductDetail extends ProductListItem {
  description: string
  rating: number
  specs: ProductSpecs
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  similarProducts: ProductListItem[]
  formattedPrice?: string
}
