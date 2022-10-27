export interface Option {
  id: string
  title: string
  category: string
  description: string
  image: string
  price: number
}

export interface Product {
  id: number
  title: string
  category: string
  description: string
  image: string
  price: number
  options?: Record<Option['category'], Option[]>
}
