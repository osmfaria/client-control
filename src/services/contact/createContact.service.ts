import { AppDataSource } from '../../data-source'
import { Client } from '../../entities/client.enitity'
import { Contact } from '../../entities/contact.entity'
import { AppError } from '../../errors/appError'
import { IContact } from '../../interfaces/contact'

const createContactService = async ({
  name,
  email,
  phone,
  client_id,
}: IContact): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact)
  const clientRepository = AppDataSource.getRepository(Client)

  const emailAlreadyExist = await contactRepository.findOne({
    where: { email: email },
  })

  const phoneAlreadyExist = await contactRepository.findOne({
    where: { phone: phone },
  })

  if (emailAlreadyExist || phoneAlreadyExist) {
    throw new AppError('Email and/or Phone already registered')
  }

  const client = await clientRepository.findOneBy({ id: client_id})

   if (!client) {
     throw new AppError('No client found for given id', 404)
   }

  const contact = await contactRepository.save({
    name,
    email,
    phone,
    client
  })

  return contact
}

export default createContactService
