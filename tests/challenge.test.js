const { expect } = require('chai');
const { describe, it, before, beforeEach } = require('mocha');
const request = require('supertest');
const { Challenge } = require('../src/models')
const app = require('../src/app.js');

describe('/challenges', () => {
    before(async () => Challenge.sequelize.sync());

    beforeEach(async () => {
        await Challenge.destroy({ where: {} });
    })

    describe('with no records in the database', () => {
        describe('POST /challenges', () => {
            it('creates a new challenge in the database', async () => {
                const res = await request(app).post('/challenges').send({
                    name: 'Test Challenge',
                    description: 'This is the description of the individual challenge.',
                    km: '5000',
                });

                const newChallengeRecord = await Challenge.findByPk(res.body.id, {
                    raw: true
                });
            
            expect(res.status).to.equal(201);
            expect(res.body.name).to.equal('Test Challenge');
            expect(newChallengeRecord.name).to.equal('Test Challenge');
            expect(newChallengeRecord.description).to.equal('This is the description of the individual challenge.');
            expect(newChallengeRecord.km).to.equal('5000');
            });
        });
    });

    describe('with records in database', () => {
        let challenges;

        beforeEach(async () => {
            challenges = await Promise.all([
                Challenge.create({
                    name: 'Test Challenge',
                    description: 'This is the description of the individual challenge.',
                    km: '5000',
                }),
                Challenge.create({name: 'Test Challenge 2', description: 'This is the description of the individual challenge.', km: '700',}),
                Challenge.create({name: 'Test Challenge 3', description: 'This is the description of the individual challenge.', km: '23300',}),
            ]);
        });

        describe('GET /challenges', () => {
            it('gets all challenges records', async () => {
                const res = await request(app).get('/challenges');

                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(3);

                res.body.forEach((challenge) => {
                    const expected = challenges.find((a) => a.id === challenge.id);

                    expect(challenge.name).to.equal(expected.name);
                    expect(challenge.description).to.equal(expected.description);
                    expect(challenge.km).to.equal(expected.km);
                });
            });
        });

        describe('GET /challenges/:id', () => {
            it('gets challenges by id', async () => {
                const challenge = challenges[0];
                const res = await request(app).get(`/challenges/${challenge.id}`);

                expect(res.status).to.equal(200);
                expect(res.body.name).to.equal(challenge.name);
                expect(res.body.description).to.equal(challenge.description);
                expect(res.body.km).to.equal(challenge.km);
            });

            it('returns a 404 if the challenge does not exist', async () => {
                const res = await request(app).get('/challenges/123456');

                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('No challenge found.');
            });
        });

        describe('PATCH /challenges/:id', () => {
            it('updates challenge description by id', async () => {
              const challenge = challenges[0];
              const res = await request(app)
                .patch(`/challenges/${challenge.id}`)
                .send({ description: 'This is the updated challenge description.' });
              const updatedChallengeRecord = await Challenge.findByPk(challenge.id, {
                raw: true,
              });
      
              expect(res.status).to.equal(200);
              expect(updatedChallengeRecord.description).to.equal('This is the updated challenge description.');
            });
      
            it('returns a 404 if the challenge does not exist', async () => {
              const res = await request(app)
                .patch('/challenges/123456')
                .send({ description: 'This is the description of the challenge that does not exist.' });
      
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal('No challenge found.');
            });
        });

        describe('DELETE /challenges/:id', () => {
            it('deletes challenge record by id', async () => {
                const challenge = challenges[0];
                const res = await request(app).delete(`/challenges/${challenge.id}`);
                const deletedChallenge = await Challenge.findByPk(challenge.id, { raw: true });

                expect(res.status).to.equal(204);
                expect(deletedChallenge).to.equal(null);
            });

            it('returns a 404 if the user does not exist', async () => {
                const res = await request(app).delete('/challenges/123456');

                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('No challenge found.');
            });
        });
    });
});

