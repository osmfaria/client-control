import { IContactResponse } from "../contact"

export interface IClient {
    name: string
    email: string
    phone: string
}

export interface IClientReturn {
  name: string
  email: string
  phone: string
  contacts: IContactResponse[]
  created_at: Date
}