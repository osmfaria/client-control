import { Router } from 'express'

// Controller imports
import {
  createContactController,
  editContactController,
  listContactsController,
  removeContactController,
} from '../controllers/contact.controller'

// Midleware imports
import pagination from '../middlewares/pagination.middleware'
import tokenValidation from '../middlewares/tokenValidation.middleware'
import isOwnerMiddleware from '../middlewares/isOwner.middleware'
import { validatedInputMiddleware } from '../middlewares/validateInput.middleware'

// Schema imports
import { contactCreateSchema, contactUpdateSchema } from '../schemas/contact.schema'


const contactRouter = Router()

contactRouter.post(
  '/clients/:client_id',
  tokenValidation,
  isOwnerMiddleware,
  validatedInputMiddleware(contactCreateSchema),
  createContactController
)
contactRouter.get(
  '/clients/:client_id',
  tokenValidation,
  isOwnerMiddleware,
  pagination,
  listContactsController
)
contactRouter.delete(
  '/:contact_id',
  tokenValidation,
  isOwnerMiddleware,
  removeContactController
)
contactRouter.patch(
  '/:contact_id',
  tokenValidation,
  isOwnerMiddleware,
  validatedInputMiddleware(contactUpdateSchema),
  editContactController
)

export default contactRouter
