import { AppDataSource } from '../../data-source'
import { Client } from '../../entities/client.enitity'
import { AppError } from '../../errors/appError'
import { IClientUpdate } from '../../interfaces/client'
import bcrypt from "bcrypt"

const editClientService = async (
  client_id: string,
  data: IClientUpdate
): Promise<Client | null> => {
  const clientRepository = AppDataSource.getRepository(Client)

  const client = await clientRepository.findOneBy({ id: client_id })

  if (!client) {
    throw new AppError('No client found for given id', 404)
  }

   if (data.password) {
     data.password = bcrypt.hashSync(data.password, 10)
   }

  await clientRepository
    .createQueryBuilder()
    .update(Client)
    .set(data)
    .where('id = :id', { id: client_id })
    .execute()

  const updatedClient = await clientRepository.findOneBy({ id: client_id })

  delete updatedClient?.password

  return updatedClient
}

export default editClientService
