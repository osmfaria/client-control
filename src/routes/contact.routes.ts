import { createContactController, editContactController, listContactsController, removeContactController } from "../controllers/contact.controller"
import { Router } from "express"


const contactRouter = Router()

contactRouter.post("/clients/:client_id", createContactController)
contactRouter.get("/clients/:client_id", listContactsController)
contactRouter.delete("/:contact_id", removeContactController)
contactRouter.patch("/:contact_id", editContactController)


export default contactRouter