import { AppDataSource } from '../../data-source'
import { Client } from '../../entities/client.enitity'
import { ILogin } from '../../interfaces/session'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { AppError } from '../../errors/appError'


const loginService = async ({ email, password }: ILogin) => {
  const clientRepository = AppDataSource.getRepository(Client)

  const client = await clientRepository.findOneBy({ email: email })

  if (!client) {
    throw new AppError('Invalid email or password', 403)
  }

  if (client.password) {
    const passwordCheck = await compare(password, client.password)

    if (!passwordCheck) {
      throw new AppError('Invalid email or password', 403)
    }
  }

  const token = jwt.sign(
    { clientId: client.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '24h' }
  )

  return token
}

export default loginService
