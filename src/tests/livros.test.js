const request = require('supertest');
const app = require('../src/app');

describe('API Livros', () => {
    it('GET /livros', async () => {
        const res = await request(app).get('/api/livros');
        expect(res.statusCode).toBe(200);
    });
});