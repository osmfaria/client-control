import { AppDataSource } from '../../data-source'
import { Client } from '../../entities/client.enitity'
import { Contact } from '../../entities/contact.entity'
import { AppError } from '../../errors/appError'
import { IPagination } from '../../interfaces/pagination'

const listContactsByClientService = async (
  client_id: string,
  { page, limit }: IPagination
) => {
  const clientRepository = AppDataSource.getRepository(Client)
  const contactRepository = AppDataSource.getRepository(Contact)

  const client = await clientRepository.findOneBy({ id: client_id })

  if (!client) {
    throw new AppError('No client found for given id', 404)
  }

  const contacts = await contactRepository
    .createQueryBuilder('contact')
    .innerJoin('contact.client', 'client')
    .where('client.id = :id', { id: client_id })
    .skip((page - 1) * limit)
    .take(limit)
    .getMany()

  return contacts
}

export default listContactsByClientService
