import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { Contact } from '../entities/contact.entity'
import { AppError } from '../errors/appError'

const isOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientId = req.clientData

  if (req.params.contact_id) {

    const contactId = req.params.contact_id

    const contactRepository = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.findOne({ where: {id: contactId}, relations: ["client"]})
    
    if(contact?.client.id === clientId) {
        next()
    } else {
        throw new AppError("Unauthorized", 401)
    }

  }

  if (req.params.client_id) {
    if (clientId === req.params.client_id) {
      next()
    } else {
      throw new AppError('Unauthorized', 401)
    }
  }
}

export default isOwnerMiddleware
