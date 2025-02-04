import { test, expect, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { before } from 'node:test'
import { C } from 'vitest/dist/chunks/reporters.6vxQttCV'




describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("o usuário consegue creiar uma nova transação", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 600,
        type: "credit",
      })

      .expect(201);
  });

  test('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 600,
        type: "credit",
      })

    const cookies = createTransactionResponse.get('Set-Cookie')
    
    const listTransactionResponse = await request (app.server)
    .get('/transactions')
    .set('Cookie', cookies)
    .expect(200)


    expect(listTransactionResponse.body.transactions).toEqual([
        expect.objectContaining({
          title: "New Transaction",
          amount: 600,
        }),
      ])
  })
})

