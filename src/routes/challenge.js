const express = require('express');
const challengeController = require('../controllers/challenge');

const router = express.Router();

router
    .route('/')
    .get(challengeController.getChallenge)
    .post(challengeController.createChallenge);

router
    .route('/:id')
    .get(challengeController.getChallengeById)
    .patch(challengeController.updateChallenge)
    .delete(challengeController.deleteChallenge);
    
module.exports = router;