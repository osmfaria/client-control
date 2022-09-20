export interface IClient {
    name: string
    email: string
    phone: string
    id?: string
}

export interface IClientReturn {
  id: string
  name: string
  email: string
  phone: string
  created_at: Date
}