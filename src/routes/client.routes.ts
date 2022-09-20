import { clientDetailController, createClientController, listClientsController, removeClientController } from "../controllers/client.controller"
import { Router } from "express"

const clientRouter = Router()

clientRouter.post("", createClientController)
clientRouter.get("", listClientsController)
clientRouter.get("/:id", clientDetailController)
clientRouter.delete("/:id", removeClientController)

export default clientRouter
