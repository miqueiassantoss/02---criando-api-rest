import { test, expect, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'
import { app } from '../src/app'
import { before, beforeEach } from 'node:test'
import { C } from 'vitest/dist/chunks/reporters.6vxQttCV'




describe('Transactions routes', () => {

  beforeAll(async () => {
    execSync('npx knex migrate:latest')
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('npm knex migrate:rollgack --all')
    execSync('npm knex migrate:latest')
  })


  test("o usuário consegue creiar uma nova transação", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 600,
        type: "credit",
      }).expect(201)

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


  test("should be able to get specifc transaction", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 600,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const transactionId = listTransactionResponse.body.transactions[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: "New Transaction",
        amount: 600,
      })
    );
  });



  test("should be able to get the summary", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "Credit Transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    await request (app.server)
    .post('/transactions')
    .set('Cookie', cookies)
    .send({
      title:'Debit Transaction',
      amount: 2000,
      type: 'debit'
    })



    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies)
      .expect(200)
    

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000
      }
    );
  });
})

