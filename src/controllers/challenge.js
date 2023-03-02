const { Challenge } = require('../models');

const createChallenge = (req, res) => {
    const newChallenge = req.body;

    Challenge
    .create(newChallenge)
    .then(newChallengeCreated => res.status(201).json(newChallengeCreated));
}

const getChallenges = (_, res) => {
    Challenge.findAll().then(challenges => {
        res.status(200).json(challenges);
    });
}

const getChallengeById = (req, res) => {
    const { id } = req.params;

    Challenge.findByPk(id).then(challenge => {
        if (!challenge) {
            res.status(404).json({ error: 'No challenge found.'});
        } else {
            res.status(200).json(challenge);
        }
    });
}

const updateChallenge = (req, res) => {
    const { id } = req.params;
    const newDetails = req.body;
  
    Challenge
      .update(newDetails, { where: { id } })
      .then(([challengesUpdated]) => {
        if (!challengesUpdated) {
          res.status(404).json({ error: 'No challenge found.' });
      } else {
        Challenge.findByPk(id).then((updatedChallenge) => {
          res
          .status(200)
          .json(updatedChallenge);
      }
        )}
    });
}

const deleteChallenge = (req, res) => {
    const { id } = req.params;
  
    Challenge
      .findByPk(id)
      .then(foundChallenge => {
        if (!foundChallenge) {
          res.status(404).json({ error: 'No challenge found.' });
        } else {
          Challenge
            .destroy({ where: { id } })
            .then(() => {
              res.status(204).send();
          });
      }
    });
}

module.exports = { createChallenge, getChallenges, getChallengeById, updateChallenge, deleteChallenge }