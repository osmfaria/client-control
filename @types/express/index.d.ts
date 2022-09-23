import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      pagination: any
      clientData: string
      validatedInput: any
    }
  }
}
