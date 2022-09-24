import "reflect-metadata"
import 'express-async-errors'
import express from "express"
import appRoutes from "./routes"
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware"

const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

appRoutes(app)

app.use(handleAppErrorMiddleware)

export default app