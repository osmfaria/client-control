import { Express } from "express"
import clientRouter from "./client.routes"

const appRoutes = (app: Express) => {
    app.use("/clients", clientRouter)
}

export default appRoutes