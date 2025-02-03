import { expect, test } from 'vitest'

test('o usuário consegue creiar uma nova transação', () => {
  //fazer a chamada a chamada htpp p/ criar uma nova transação

  //validação
  const responseStatusCode = 201

  expect(responseStatusCode).toEqual(201)
  
})