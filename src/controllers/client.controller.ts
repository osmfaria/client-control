import { Request, Response } from 'express'
import { instanceToPlain } from 'class-transformer'
import clientDetailService from '../services/client/clientDetail.service'
import createClientService from '../services/client/createClient.service'
import editClientService from '../services/client/editClient.service'
import listClientsService from '../services/client/listClients.service'
import removeClientService from '../services/client/removeClient.service'

export const createClientController = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.validatedInput

  const client = await createClientService({ name, email, password, phone })

  return res.status(201).json(instanceToPlain(client))
}

export const listClientsController = async (req: Request, res: Response) => {
  const { page, limit } = req.pagination
  const clients = await listClientsService({ page, limit })

  return res.json(clients)
}

export const clientDetailController = async (req: Request, res: Response) => {
  const { client_id } = req.params

  const client = await clientDetailService(client_id)

  return res.json(client)
}

export const removeClientController = async (req: Request, res: Response) => {
  const { client_id } = req.params

  await removeClientService(client_id)

  return res.status(204).json()
}

export const editClientController = async (req: Request, res: Response) => {
  const { client_id } = req.params
  const data = req.validatedInput

  const updatedClient = await editClientService(client_id, data)

  return res.json(updatedClient)
}
