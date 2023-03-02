const { expect } = require('chai');
const { describe, it } = require('mocha');
const request = require('supertest');
const { User } = require('../src/models')
const app = require('../src/app.js');

describe('/users', () => {
    before(async () => User.sequelize.sync());

    beforeEach(async () => {
        await User.destroy({ where: {} });
    })

    describe('with no records in the database', () => {
        describe('POST /users', () => {
            it('creates a new user in the database', async () => {
                const res = await request(app).post('/users').send({
                    name: 'Test User',
                    email: 'user@test.com',
                });

                const newUserRecord = await User.findByPk(res.body.id, { raw: true });

            expect(res.status).to.equal(201);
            expect(res.body.name).to.equal('Test User');
            expect(newUserRecord.name).to.equal('Test User');
            expect(newUserRecord.email).to.equal('user@test.com');
            });
        });
    });
});