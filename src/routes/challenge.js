const express = require('express');
const challengeController = require('../controllers/challenge');

const router = express.Router();

router
    .route('/')
    .get(challengeController.getChallenge)
    .post(challengeController.createChallenge);


// this router gets the challenge data by the user id
router
    .route('/UserId/:user')
    .get(challengeController.getChallengeByUserId)
    .patch(challengeController.updateChallenge)
    .delete(challengeController.deleteChallenge);
    
module.exports = router;