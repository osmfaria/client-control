import { Express } from "express"
import clientRouter from "./client.routes"
import contactRouter from "./contact.routes"
import sessionRouter from "./session.routes"

const appRoutes = (app: Express) => {
    app.use("/clients", clientRouter),
    app.use("/login", sessionRouter),
    app.use("/contacts", contactRouter)
}

export default appRoutes