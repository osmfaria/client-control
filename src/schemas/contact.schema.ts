import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IContactCreate, IContactUpdateForSchema } from '../interfaces/contact'

export const contactCreateSchema: SchemaOf<IContactCreate> = yup.object().shape({
  name: yup.string().required().max(250),
  email: yup
    .string()
    .email()
    .required()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase()
    })
    .max(50),
  phone: yup.string().required().max(16),
})

export const contactUpdateSchema: SchemaOf<IContactUpdateForSchema> = yup.object().shape({
  name: yup.string().max(250),
  email: yup
    .string()
    .email()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase()
    })
    .max(50),
  phone: yup.string().max(16),
})
