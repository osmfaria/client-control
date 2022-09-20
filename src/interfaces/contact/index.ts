export interface IContact {
  name: string
  email: string
  phone: string
  client_id: string
}

export interface IContactResponse {
  id: string
  name: string
  email: string
  phone: string
}

export interface IContactUpdate {
  id?: string
  name?: string
  email?: string
  phone?: string
}
