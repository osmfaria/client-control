import request from 'supertest'
import app from '../src/app'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../src/data-source'
import { Client } from '../src/entities/client.enitity'
import loginService from '../src/services/session/login.service'
import { IClient } from '../src/interfaces/client'
import createClientService from '../src/services/client/createClient.service'

describe('Tests for client routes:', () => {
  let connection: DataSource
  let testToken: string
  let testClientId: string
  let testUser: IClient

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log('Error during Data Source initialization', err)
      })

    const name = 'loged user'
    const email = 'logeduser@mail.com'
    const password = '12345678'
    const phone = '23623628'

    const logedUserData = { name, email, password, phone }
    const response = await request(app).post('/clients').send(logedUserData)

    testUser = response.body
    testClientId = response.body.id
    testToken = await loginService({ email, password })
  })

  afterAll(async () => {
    const clientRepository = AppDataSource.getRepository(Client)
    await clientRepository.createQueryBuilder().delete().from(Client).execute()

    await connection.destroy()
  })

  test('Should be able to create a new client', async () => {
    const name = 'odin allfather'
    const email = 'odin@mail.com'
    const password = '12345678'
    const phone = '12345'

    const clientData = { name, email, password, phone }

    const response = await request(app).post('/clients').send(clientData)
    const id = response.body.id
    const created_at = response.body.created_at

    expect(response.status).toBe(201)

    expect(response.body).toEqual(
      expect.objectContaining({
        id,
        name,
        email,
        phone,
        created_at,
      })
    )
  })

  test('Should not create a client with the same email', async () => {
    const name = 'thor odinson'
    const email = 'odin@mail.com'
    const password = '12345678'
    const phone = '236788'

    const clientData = { name, email, password, phone }

    const response = await request(app).post('/clients').send(clientData)

    expect(response.status).toBe(400)

    expect(response.body).toEqual({
      message: 'Email and/or Phone already registered',
    })
  })

  test('Should be able to login', async () => {
    const email = 'odin@mail.com'
    const password = '12345678'

    const response = await request(app).post('/login').send({ email, password })

    expect(response.status).toBe(200)
    expect(Object.keys(response.body)).toStrictEqual(['token'])
  })

  test('Should not be able to login with wrong password', async () => {
    const email = 'odin@mail.com'
    const password = '12'

    const response = await request(app).post('/login').send({ email, password })

    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Invalid email or password')
  })

  test('Should be able to list clients', async () => {
    const response = await request(app)
      .get('/clients')
      .set('Authorization', `bearer: ${testToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('map')
  })

  test('Should be able to check details of your own client', async () => {
    const response = await request(app)
      .get(`/clients/${testClientId}`)
      .set('Authorization', `bearer: ${testToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(testUser)
  })



  test('Should be able to edit your own client', async () => {
    const patchData = { name: 'patched user' }
    const patchedUser = { ...testUser, ...patchData }

    const response = await request(app)
      .patch(`/clients/${testClientId}`)
      .send(patchData)
      .set('Authorization', `bearer: ${testToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(patchedUser)
  })

  test('Should not be able to edit a client that it is not your own', async () => {
    const email = 'odin@mail.com'
    const password = '12345678'

    const token = await loginService({ email, password })

    const patchData = { name: 'patched user' }

    const response = await request(app)
      .patch(`/clients/${testClientId}`)
      .send(patchData)
      .set('Authorization', `bearer: ${token}`)

    expect(response.status).toBe(401)
    expect(response.body).toStrictEqual({ message: 'Unauthorized' })
  })

  test('Should not be able to delete other client', async () => {
    const email = 'odin@mail.com'
    const password = '12345678'

    const token = await loginService({ email, password })

    const response = await request(app)
      .delete(`/clients/${testClientId}`)
      .set('Authorization', `bearer: ${token}`)

    expect(response.status).toBe(401)
    expect(response.body).toStrictEqual({ message: 'Unauthorized' })
  })

  test('Owner should be able to delete client', async () => {
    const name = 'deleted'
    const email = 'deleted@mail.com'
    const password = '12345678'
    const phone = '44444'

    const testSampleData = { name, email, password, phone }


    const testSampleClient = await createClientService(testSampleData)

    const token = await loginService({ email, password })

    const response = await request(app)
      .delete(`/clients/${testSampleClient.id}`)
      .set('Authorization', `bearer: ${token}`)

    expect(response.status).toBe(204)
  }) 

})
