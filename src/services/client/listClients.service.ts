import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.enitity";
import { IPagination } from "../../interfaces/pagination";


const listClientsService = async ({ page, limit }: IPagination): Promise<Client[]> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const clients = await clientRepository.createQueryBuilder().skip((page - 1) * limit).take(limit).getMany()

    return clients
}

export default listClientsService