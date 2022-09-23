import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.enitity"
import { AppError } from "../../errors/appError"


const removeClientService = async ( client_id: string ): Promise<void> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({ id: client_id })

    if (!client) {
        throw new AppError("No client found for given id", 404)
    }

    await clientRepository
    .createQueryBuilder()
    .delete()
    .from(Client)
    .where("id = :id", {id: client_id})
    .execute()
}

export default removeClientService