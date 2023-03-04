const { expect } = require('chai');
const { describe, it, before, beforeEach } = require('mocha');
const request = require('supertest');
const { Progress } = require('../src/models')
const app = require('../src/app.js');

describe('/progress', () => {
    before(async () => Progress.sequelize.sync());

    beforeEach(async () => {
        await Progress.destroy({ where: {} });
    })

    describe('with no records in the database', () => {
        describe('POST /progress', () => {
            it('creates new progress in the database', async () => {
                const res = await request(app).post('/progress').send({
                    user: 'Test User',
                    challengeId: '1',
                    distance: '5000',
                });

                const newProgressRecord = await Progress.findByPk(res.body.id, {
                    raw: true
                });
            
            expect(res.status).to.equal(201);
            expect(res.body.distance).to.equal('5000');
            expect(newProgressRecord.user).to.equal('Test User');
            expect(newProgressRecord.challengeId).to.equal('1');
            expect(newProgressRecord.distance).to.equal('5000');
            });
        });
    });

    describe('with records in database', () => {
        let progression;

        beforeEach(async () => {
            progression = await Promise.all([
                Progress.create({
                    user: 'Test User',
                    challengeId: '1',
                    distance: '5000',
                }),
                Progress.create({user: 'Test User2',
                challengeId: '3',
                distance: '70',}),
                Progress.create({user: 'Test User3',
                challengeId: '5',
                distance: '12',}),
            ]);
        });

        describe('GET /progress/:id', () => {
            it('gets progress by id', async () => {
                const progress = progression[0];
                const res = await request(app).get(`/progress/${progress.id}`);

                expect(res.status).to.equal(200);
                expect(res.body.user).to.equal(progress.user);
                expect(res.body.challengeId).to.equal(progress.challengeId);
                expect(res.body.distance).to.equal(progress.distance);
            });

            it('returns a 404 if the challenge does not exist', async () => {
                const res = await request(app).get('/progress/123456');

                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('No progress found.');
            });
        });

        describe('PATCH /progress/:id', () => {
            it('updates progress distance by id', async () => {
              const progress = progression[0];
              const res = await request(app)
                .patch(`/progress/${progress.id}`)
                .send({ distance: '50' });
              const updatedProgressRecord = await Progress.findByPk(progress.id, {
                raw: true,
              });
      
              expect(res.status).to.equal(200);
              expect(updatedProgressRecord.distance).to.equal('50');
            });
      
            it('returns a 404 if the progress does not exist', async () => {
              const res = await request(app)
                .patch('/progress/123456')
                .send({ description: '50' });
      
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal('No progress found.');
            });
        });

        describe('DELETE /progress/:id', () => {
            it('deletes progress record by id', async () => {
                const progress = progression[0];
                const res = await request(app).delete(`/progress/${progress.id}`);
                const deletedProgress = await Progress.findByPk(progress.id, { raw: true });

                expect(res.status).to.equal(204);
                expect(deletedProgress).to.equal(null);
            });

            it('returns a 404 if the user does not exist', async () => {
                const res = await request(app).delete('/progress/123456');

                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('No progress found.');
            });
        });
    });
});

