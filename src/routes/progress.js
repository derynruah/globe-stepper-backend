const express = require('express');
const progressController = require('../controllers/progress');

const router = express.Router();

router
    .route('/')
    .post(progressController.createProgress);

router
    .route('/:id')
    .get(progressController.getProgressById)
    .patch(progressController.updateProgress)
    .delete(progressController.deleteProgress);

module.exports = router;