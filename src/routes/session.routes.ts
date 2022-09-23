import { Router } from 'express'
import { loginController } from '../controllers/session.controller'

const sessionRouter = Router()

sessionRouter.post("", loginController)

export default sessionRouter
