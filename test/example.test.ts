import { test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { before } from 'node:test'

beforeAll(async() => {
  await app.ready()
})


afterAll(async () => {
  await app.close()
})

test('o usuário consegue creiar uma nova transação', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'New Transaction',
      amount: 600,
      type: 'credit',
    })
  
  .expect(201)
})