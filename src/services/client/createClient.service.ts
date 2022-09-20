import { AppDataSource } from "../../data-source"
import { Client } from "../../entities/client.enitity"
import { AppError } from "../../errors/appError"
import { IClient, IClientReturn } from "../../interfaces/client"


const createClientService = async ({
    name,
    email,
    phone,
}: IClient):Promise<Client> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const emailAlreadyExist = await clientRepository.findOne({ where: {email: email}})
    
    const phoneAlreadyExist = await clientRepository.findOne({ where: {phone: phone}})

    if(emailAlreadyExist || phoneAlreadyExist) {
        throw new AppError("Email and/or Phone already registered")
    }

    const created_at = new Date()

    const newClient = await clientRepository.save({
        name,
        email,
        phone,
        created_at
    })

    return newClient
}

export default createClientService

