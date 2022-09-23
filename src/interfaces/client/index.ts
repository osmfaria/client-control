export interface IClient {
    name: string
    email: string
    password: string
    phone: string
}

export interface IClientUpdate {
  name?: string
  password?: string
  email?: string
  phone?: string
}
