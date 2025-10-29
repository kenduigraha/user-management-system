export interface User {
  id: number
  name: string
  email: string
  username?: string
  phone?: string
  website?: string
  company?: {
    name: string
  }
}

export interface UserFormData {
  name: string
  email: string
  phone?: string
  company?: {
    name: string
  }
  website?: string
}