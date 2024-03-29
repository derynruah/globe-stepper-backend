const { Challenge } = require('../models');

const createChallenge = (req, res) => {
    const newChallenge = (req.body.updatedChallenge);
    console.log(newChallenge);

    Challenge
    .create(newChallenge)
    .then(newChallengeCreated => res.status(201).json(newChallengeCreated));
}

const getChallenge = (_, res) => {
    Challenge.findAll().then(challenges => {
        res.status(200).json(challenges);
    });
}

const getChallengeByUserId = async (req, res) => {
    const { user } = req.params;

    try{
      const getChallengeByUserId = await Challenge.findAll({
        where: { UserId: user},
      });
      res.status(200).json(getChallengeByUserId);
    } catch (err) {
      res.status(500).json(err);
    }
}

const updateChallenge = (req, res) => {
    const { id } = req.params;
    const newDetails = req.body;
  
    Challenge
      .update(newDetails, { where: { id } })
      .then(([recordsUpdated]) => {
        if (!recordsUpdated) {
          res.status(404).json({ error: 'No account found.' });
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


module.exports = { createChallenge, getChallenge, getChallengeByUserId, updateChallenge, deleteChallenge }