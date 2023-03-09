const { expect } = require('chai');
const request = require('supertest');
const { User } = require('../src/models');
const app = require('../src/app.js');

describe('/auth', () => {
  before(async () => await User.sequelize.sync());

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /auth/register', () => {
      it('creates a new user in the database', async () => {
        const response = await request(app).post('/auth/register').send({
          username: 'Test User',
          email: 'test@test.com',
          password: '12345678',
        });
        console.log(response.body);
        expect(response.body.message).to.equal(
          'User was registered successfully!'
        );
      });
    });
  });
});