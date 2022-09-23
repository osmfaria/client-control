import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.enitity";
import { AppError } from "../../errors/appError";


const clientDetailService = async (client_id: string): Promise<Client | null> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({ id: client_id })

    if (!client) {
        throw new AppError("No client found for given id", 404)
    }

    delete client?.password

    return client
}

export default clientDetailService