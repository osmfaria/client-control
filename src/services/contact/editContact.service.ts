import { AppDataSource } from '../../data-source'
import { Contact } from '../../entities/contact.entity'
import { AppError } from '../../errors/appError'
import { IContactUpdate } from '../../interfaces/contact'

const editContactService = async (
  contact_id: string,
  data: IContactUpdate
): Promise<Contact | null> => {
  const contactRepository = AppDataSource.getRepository(Contact)

  const contact = await contactRepository.findOneBy({ id: contact_id })

  if (!contact) {
    throw new AppError('No contact found for given id', 404)
  }

  await contactRepository
    .createQueryBuilder()
    .update(Contact)
    .set(data)
    .where('id = :id', { id: contact_id })
    .execute()

  const updatedContact = await contactRepository.findOneBy({ id: contact_id })

  return updatedContact
}

export default editContactService
