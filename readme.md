<h1 align="center"> Finance API REST </h1>

<p align="center">
  Uma API RESTful robusta desenvolvida para controle de transações financeiras, permitindo o gerenciamento de créditos, débitos e visualização de resumo de conta.
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-regras-de-negócio">Regras de Negócio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rotas">Rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-rodar">Como Rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido utilizando o ecossistema Node.js moderno:

- **[Node.js](https://nodejs.org/)** & **[TypeScript](https://www.typescriptlang.org/)**
- **[Fastify](https://www.fastify.io/)** (Framework web de alta performance)
- **[Knex.js](https://knexjs.org/)** (Query Builder e Migrations)
- **[SQLite](https://www.sqlite.org/)** / **[PostgreSQL](https://www.postgresql.org/)** (Banco de dados)
- **[Zod](https://zod.dev/)** (Validação de dados)
- **[Vitest](https://vitest.dev/)** & **[Supertest](https://www.npmjs.com/package/supertest)** (Testes E2E)

## 💼 Regras de Negócio

A aplicação foi construída seguindo os seguintes requisitos:

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;
- [x] A transação pode ser do tipo **crédito** (soma ao valor total) ou **débito** (subtrai);
- [x] Deve ser possível identificar o usuário entre as requisições (uso de Cookies/Session ID);
- [x] O usuário só pode visualizar transações que ele mesmo criou.

## 📍 Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/transactions` | Cria uma nova transação (Body: `title`, `amount`, `type`) |
| `GET` | `/transactions` | Lista todas as transações do usuário (requer Cookie) |
| `GET` | `/transactions/:id` | Exibe detalhes de uma transação única |
| `GET` | `/transactions/summary` | Retorna o resumo (saldo total) da conta |

## 🎲 Como Rodar

```bash
# Clone este repositório
$ git clone [https://github.com/miqueiassantoss/02---criando-api-rest.git](https://github.com/miqueiassantoss/02---criando-api-rest.git)

# Acesse a pasta do projeto no terminal/cmd
$ cd 02---criando-api-rest

# Instale as dependências
$ npm install

# Execute as migrations para criar o banco de dados
$ npm run knex -- migrate:latest

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta:3333


### Rodando os Testes

A aplicação conta com testes automatizados de ponta a ponta (E2E).

```bash
# Executar testes
$ npm test bash
