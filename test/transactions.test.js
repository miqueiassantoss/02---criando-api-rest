"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const node_child_process_1 = require("node:child_process");
const app_1 = require("../src/app");
const node_test_1 = require("node:test");
(0, vitest_1.describe)('Transactions routes', () => {
    (0, vitest_1.beforeAll)(async () => {
        (0, node_child_process_1.execSync)('npx knex migrate:latest');
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, node_test_1.beforeEach)(() => {
        (0, node_child_process_1.execSync)('npm knex migrate:rollgack --all');
        (0, node_child_process_1.execSync)('npm knex migrate:latest');
    });
    (0, vitest_1.test)("o usuário consegue creiar uma nova transação", async () => {
        await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({
            title: "New Transaction",
            amount: 600,
            type: "credit",
        }).expect(201);
    });
    (0, vitest_1.test)('should be able to list all transactions', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({
            title: "New Transaction",
            amount: 600,
            type: "credit",
        });
        const cookies = createTransactionResponse.get('Set-Cookie');
        const listTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200);
        (0, vitest_1.expect)(listTransactionResponse.body.transactions).toEqual([
            vitest_1.expect.objectContaining({
                title: "New Transaction",
                amount: 600,
            }),
        ]);
    });
    (0, vitest_1.test)("should be able to get specifc transaction", async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({
            title: "New Transaction",
            amount: 600,
            type: "credit",
        });
        const cookies = createTransactionResponse.get("Set-Cookie");
        const listTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .get("/transactions")
            .set("Cookie", cookies)
            .expect(200);
        const transactionId = listTransactionResponse.body.transactions[0].id;
        const getTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .get(`/transactions/${transactionId}`)
            .set("Cookie", cookies)
            .expect(200);
        (0, vitest_1.expect)(getTransactionResponse.body.transaction).toEqual(vitest_1.expect.objectContaining({
            title: "New Transaction",
            amount: 600,
        }));
    });
    (0, vitest_1.test)("should be able to get the summary", async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({
            title: "Credit Transaction",
            amount: 5000,
            type: "credit",
        });
        const cookies = createTransactionResponse.get("Set-Cookie");
        await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .set('Cookie', cookies)
            .send({
            title: 'Debit Transaction',
            amount: 2000,
            type: 'debit'
        });
        const summaryResponse = await (0, supertest_1.default)(app_1.app.server)
            .get("/transactions/summary")
            .set("Cookie", cookies)
            .expect(200);
        (0, vitest_1.expect)(summaryResponse.body.summary).toEqual({
            amount: 3000
        });
    });
});
