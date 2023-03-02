const { expect } = require('chai');
const { describe, it, before, beforeEach } = require('mocha');
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

                const newUserRecord = await User.findByPk(res.body.id, { 
                    raw: true
                });

            expect(res.status).to.equal(201);
            expect(res.body.name).to.equal('Test User');
            expect(newUserRecord.name).to.equal('Test User');
            expect(newUserRecord.email).to.equal('user@test.com');
            });
        });
    });

    describe('with records in database', () => {
        let users;

        beforeEach(async () => {
            users = await Promise.all([
                User.create({
                    name: 'Test User',
                    email: 'user@test.com',
                }),
                User.create({ name: 'Second User', email: 'user2@test.com' }),
                User.create({ name: 'Third User', email: 'user3@test.com'}),
            ]);
        });

        describe('GET /users', () => {
            it('gets all users records', async () => {
                const res = await request(app).get('/users');

                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(3);

                res.body.forEach((user) => {
                    const expected = users.find((a) => a.id === user.id);

                    expect(user.name).to.equal(expected.name);
                    expect(user.email).to.equal(expected.email);
                });
            });
        });

        describe('GET /users/:id', () => {
            it('gets users by id', async () => {
                const user = users[0];
                const res = await request(app).get(`/users/${user.id}`);

                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal(user.name);
                expect(res.body.email).to.equal(user.email);
            });

            it('returns a 404 if the user does not exist', async () => {
                const res = await request(app).get('/users/123456');

                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('No account found.');
            });
        });

        describe('PATCH /users/:id', () => {
            it('updates users email by id', async () => {
              const user = users[0];
              const res = await request(app)
                .patch(`/users/${user.id}`)
                .send({ email: 'patch@test.com' });
              const updatedUserRecord = await User.findByPk(user.id, {
                raw: true,
              });
      
              expect(res.status).to.equal(200);
              expect(updatedUserRecord.email).to.equal('patch@test.com');
            });
      
            it('returns a 404 if the user does not exist', async () => {
              const res = await request(app)
                .patch('/users/123456')
                .send({ email: 'error@test.com' });
      
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal('No account found.');
            });
        });

        describe('DELETE /users/:id', () => {
            it('deletes user record by id', async () => {
                const user = users[0];
                const res = await request(app).delete(`/users/${user.id}`);
                const deletedUser = await User.findByPk(user.id, { raw: true });

                expect(res.status).to.equal(204);
                expect(deletedUser).to.equal(null);
            });

            it('returns a 404 if the user does not exist', async () => {
                const res = await request(app).delete('/users/123456');

                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('No account found.');
            });
        });
    });
}); 