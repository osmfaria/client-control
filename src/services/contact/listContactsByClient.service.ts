import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.enitity"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors/appError"
import { IClientReturn } from "../../interfaces/client"


const listContactsByClientService = async (client_id: string): Promise<IClientReturn> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOne({
        relations: {
            contacts: true
        },
        where: { id: client_id },
    })

    if(!client) {
        throw new AppError('No client found for given id', 404)
    }

    return client
}

export default listContactsByClientService