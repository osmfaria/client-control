import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.enitity"
import { AppError } from "../../errors/appError"
import { IClient } from "../../interfaces/client"
import bcrypt from 'bcrypt'

const createClientService = async ({
    name,
    email,
    password,
    phone,
}: IClient): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client)

  const emailAlreadyExist = await clientRepository.findOne({
    where: { email: email },
  })

  const phoneAlreadyExist = await clientRepository.findOne({
    where: { phone: phone },
  })

  if (emailAlreadyExist || phoneAlreadyExist) {
    throw new AppError('Email and/or Phone already registered')
  }

  const created_at = new Date()

  const hashedPassword = bcrypt.hashSync(password, 10)

  const client = clientRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      created_at
  })

  await clientRepository.save(client)

  delete client.password

  return client
}

export default createClientService

