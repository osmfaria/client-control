import {Request, Response, NextFunction} from "express"
import * as yup from "yup"
import { AppError } from "../errors/appError"

export const validatedInputMiddleware = (schema: yup.AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body

    try {
        const validatedData = await schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        })
        req.validatedInput = validatedData
        next()
    } catch (e) {
        next(new AppError((e as any).errors, (e as any).statusCode))
    }
}
