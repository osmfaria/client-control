import {Request, Response } from "express"
import createContactService from "../services/contact/createContact.service"
import editContactService from "../services/contact/editContact.service"
import listContactsByClientService from "../services/contact/listContactsByClient.service"
import removeContactService from "../services/contact/removeContact.service"

export const createContactController = async (req: Request, res: Response) => {
    const { client_id } = req.params
    const { name, email, phone } = req.validatedInput

    const contact = await createContactService({ name, email, phone, client_id})

    return res.status(201).json(contact)
}

export const listContactsController = async (req: Request, res: Response) => {
    const { client_id } = req.params
    const { page, limit } = req.pagination
    
    const contacts = await listContactsByClientService(client_id, {page, limit})

    return res.json(contacts)
}

export const removeContactController = async (req: Request, res: Response) => {
    const { contact_id } = req.params

    await removeContactService(contact_id)

    return res.status(204).json()
}

export const editContactController = async (req: Request, res: Response) => {
    const { contact_id } = req.params
    const data = req.validatedInput

    const updatedContact = await editContactService(contact_id, data)

    return res.json(updatedContact)
}
