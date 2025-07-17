const request = require('supertest');
const app = require('../app'); // export your app instead of listening in app.js

describe('Auth Routes', () => {
    it('registers a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: '123456',
                name: 'Test User',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.user.email).toBe('test@example.com');
    });
});
