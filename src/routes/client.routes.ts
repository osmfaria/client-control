import { Router } from 'express'

// Controller imports
import {
  clientDetailController,
  createClientController,
  editClientController,
  listClientsController,
  removeClientController,
} from '../controllers/client.controller'


// Midleware imports
import pagination from '../middlewares/pagination.middleware'
import tokenValidation from '../middlewares/tokenValidation.middleware'
import isOwnerMiddleware from '../middlewares/isOwner.middleware'
import { validatedInputMiddleware } from '../middlewares/validateInput.middleware'

// Schema imports
import { clientCreateSchema, clientUpdateSchema } from '../schemas/client.scema'


const clientRouter = Router()

clientRouter.post(
  '',
  validatedInputMiddleware(clientCreateSchema),
  createClientController
)
clientRouter.get('', tokenValidation, pagination, listClientsController)
clientRouter.get(
  '/:client_id',
  tokenValidation,
  isOwnerMiddleware,
  clientDetailController
)
clientRouter.delete(
  '/:client_id',
  tokenValidation,
  isOwnerMiddleware,
  removeClientController
)
clientRouter.patch(
  '/:client_id',
  tokenValidation,
  isOwnerMiddleware,
  validatedInputMiddleware(clientUpdateSchema),
  editClientController
)

export default clientRouter
