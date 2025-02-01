import { FastifyInstance } from 'fastify';
import { z } from 'zod'
import {knex} from '../database'
import { randomUUID } from 'crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    //{title, amount, type: debit or credit}

    const createTransasctionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const {title, amount, type} = createTransasctionBodySchema.parse(request.body,)

  await knex('transactions')
   .insert({
    id: randomUUID(),
    title,
    amount: type === 'credit' ? amount: amount * -1,
   })

    return reply.status(201).send("Deu certo!")
  });
}