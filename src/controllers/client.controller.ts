import { Request, Response } from "express"
import clientDetailService from "../services/client/clientDetail.service"
import createClientService from "../services/client/createClient.service"
import listClientsService from "../services/client/listClients.service"
import removeClientService from "../services/client/removeClient.service"


export const createClientController = async (req: Request, res: Response) => {
    const { name, email, phone} = req.body

    const client = await createClientService({ name, email, phone })

    return res.status(201).json(client)
}

export const listClientsController = async (req: Request, res: Response) => {
    const clients = await listClientsService()

    return res.json(clients)
}

export const clientDetailController = async (req: Request, res: Response) => {
    const { id } = req.params

    const client = await clientDetailService(id)

    return res.json(client)
}

export const removeClientController = async (req: Request, res: Response) => {
    const { id } = req.params

    await removeClientService(id)

    return res.status(204).json()
}
