import "reflect-metadata"
import express from "express"

const app = express()
app.use(express.json())

// add routes

export default app