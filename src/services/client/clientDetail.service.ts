import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.enitity";
import { AppError } from "../../errors/appError";


const clientDetailService = async (id: string): Promise<Client | null> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = clientRepository.findOneBy({ id: id })

    if (!client) {
        throw new AppError("No client found for given id", 404)
    }

    return client
}

export default clientDetailService