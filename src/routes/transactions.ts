import { FastifyInstance } from 'fastify';
import { z } from 'zod'
import {knex} from '../database'
import { randomUUID } from 'crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return {transactions}
  }) 

  //http:localhost:3333/transactions/isaisajisfn2277 (id)
  app.get('/:id', async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first()

    return {transaction}
  })

  
  app.get('/summary', async () => {
    const summary = await knex('transactions').sum('amount', {as: 'amount'}).first()

    return { summary}
  })


  app.post("/", async (request, reply) => {
    const createTransasctionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const {title, amount, type} = createTransasctionBodySchema.parse(request.body,)

    /*Procurando dentro dos cookies da req se já existe uma session Id*/
    let sessionId = request.cookies.sessionId

    //Se não tiver, ele vai criar.
    if(!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/', //Disponibilizando o cookie em todas as rotas
        maxAge: 60 * 60 * 24 * 7  /*Expiração do Cookie, da pra usar o expires que faz expirar em uma dia especifico, e esse maxAge é em segundos. No caso, fizemos ele disponível por 7 dias.*/
      })
    }

    await knex('transactions')
    .insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount: amount * -1,
      session_id: sessionId,
    })

      return reply.status(201).send("Deu certo!")
    });
  }