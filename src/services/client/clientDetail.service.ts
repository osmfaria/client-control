import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.enitity";
import { AppError } from "../../errors/appError";
import { IClientReturn } from "../../interfaces/client";


const clientDetailService = async (id: string): Promise<IClientReturn | null> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = clientRepository.findOneBy({ id: id })

    if (!client) {
        throw new AppError("No client found for given id", 404)
    }

    return client
}

export default clientDetailService