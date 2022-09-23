export interface IContact {
  name: string
  email: string
  phone: string
  client_id: string
}

export interface IContactUpdate {
  id?: string
  name?: string
  email?: string
  phone?: string
}

export interface IContactCreate {
  name: string
  email: string
  phone: string
}

export interface IContactUpdateForSchema {
  name?: string
  email?: string
  phone?: string
}


