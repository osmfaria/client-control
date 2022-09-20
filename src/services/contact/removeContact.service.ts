import { AppDataSource } from '../../data-source'
import { Client } from '../../entities/client.enitity'
import { Contact } from '../../entities/contact.entity'
import { AppError } from '../../errors/appError'

const removeContactService = async (contact_id: string): Promise<void> => {
  const contactRepository = AppDataSource.getRepository(Contact)

  const contact = contactRepository.findOneBy({ id: contact_id })

  if (!contact) {
    throw new AppError('No contact found for given id', 404)
  }

  await contactRepository
    .createQueryBuilder()
    .delete()
    .from(Contact)
    .where('id = :id', { id: contact_id })
    .execute()
}

export default removeContactService
