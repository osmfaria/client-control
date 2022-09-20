import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.enitity";
import { IClientReturn } from "../../interfaces/client";


const listClientsService = async (): Promise<Client[]> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const clients = await clientRepository.find()

    return clients
}

export default listClientsService