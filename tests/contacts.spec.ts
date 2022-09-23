import request from 'supertest'
import app from '../src/app'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../src/data-source'
import { Client } from '../src/entities/client.enitity'
import loginService from '../src/services/session/login.service'
import { IClient } from '../src/interfaces/client'
import createContactService from '../src/services/contact/createContact.service'
import { Contact } from '../src/entities/contact.entity'
import listContactsByClientService from '../src/services/contact/listContactsByClient.service'

describe('Tests for client routes', () => {
  let connection: DataSource
  let testToken: string
  let testClientId: string
  let testUser: IClient
  let testContactId: string
  let testContact: Contact

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log('Error during Data Source initialization', err)
      })

    // test cliet mock

    const name = 'loged user'
    const email = 'logeduser@mail.com'
    const password = '12345678'
    const phone = '23623628'

    const logedUserData = { name, email, password, phone }
    const response = await request(app).post('/clients').send(logedUserData)

    testUser = response.body
    testClientId = response.body.id
    testToken = await loginService({ email, password })

    // test contact mock

    const contactData = { name, email, phone, client_id: testClientId }
    testContact = await createContactService(contactData)
  })

  afterAll(async () => {
    const clientRepository = AppDataSource.getRepository(Client)
    await clientRepository.createQueryBuilder().delete().from(Client).execute()

    await connection.destroy()
  })

  test('Should be able to create a contact', async () => {
    const name = 'tester'
    const email = 'test@mail.com'
    const phone = '236628'

    const contactData = { name, email, phone }

    const response = await request(app)
      .post(`/contacts/clients/${testClientId}`)
      .send(contactData)
      .set('Authorization', `bearer: ${testToken}`)

    testContactId = response.body.id

    expect(response.status).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: testContactId,
        name,
        email,
        phone,
      })
    )
  })

  test('Should be able to edit contact', async () => {
    const contactData = { name: 'tester edited' }

    const response = await request(app)
      .patch(`/contacts/${testContact.id}`)
      .send(contactData)
      .set('Authorization', `bearer: ${testToken}`)

    expect(response.status).toBe(200)
    expect(response.body.name).toEqual(contactData.name)
  })

  test('Should be able to list contacts', async () => {
    const response = await request(app)
      .get(`/contacts/clients/${testClientId}`)
      .set('Authorization', `bearer: ${testToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('map')
  })

  test('Should be able to remove a contact', async () => {
    const response = await request(app)
      .delete(`/contacts/${testContactId}`)
      .set('Authorization', `bearer: ${testToken}`)
    
    const contacts = await listContactsByClientService(testClientId, {page: 1, limit: 10})
    
    expect(response.status).toBe(204)
    expect(contacts.length).toBe(1)
  })
})
