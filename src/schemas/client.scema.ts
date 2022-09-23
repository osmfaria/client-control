import * as yup from "yup"
import { SchemaOf } from "yup"
import { IClient, IClientUpdate } from "../interfaces/client"


export const clientCreateSchema: SchemaOf<IClient> = yup.object().shape({
  name: yup.string().required().max(250),
  password: yup.string().required().min(4).max(16),
  email: yup
    .string()
    .email()
    .required()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase()
    })
    .max(50),
    phone: yup.string().required().max(16)
})

export const clientUpdateSchema: SchemaOf<IClientUpdate> = yup.object().shape({
  name: yup.string().max(250),
  password: yup.string().min(4).max(16),
  email: yup
    .string()
    .email()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase()
    })
    .max(50),
  phone: yup.string().max(16),
})