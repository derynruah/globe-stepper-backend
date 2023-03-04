const { Progress } = require('../models');

const createProgress = (req, res) => {
    const newProgress = req.body;

    Progress
    .create(newProgress)
    .then(newProgressCreated => res.status(201).json(newProgressCreated));
}

const getProgressById = (req, res) => {
    const { id } = req.params;

    Progress.findByPk(id).then(progress => {
        if (!progress) {
            res.status(404).json({ error: 'No progress found.'});
        } else {
            res.status(200).json(progress);
        }
    });
}

const updateProgress = (req, res) => {
    const { id } = req.params;
    const newDetails = req.body;
  
    Progress
      .update(newDetails, { where: { id } })
      .then(([progressUpdated]) => {
        if (!progressUpdated) {
          res.status(404).json({ error: 'No progress found.' });
      } else {
        Progress.findByPk(id).then((updatedProgress) => {
          res
          .status(200)
          .json(updatedProgress);
      }
        )}
    });
}

const deleteProgress = (req, res) => {
    const { id } = req.params;
  
    Progress
      .findByPk(id)
      .then(foundProgress => {
        if (!foundProgress) {
          res.status(404).json({ error: 'No progress found.' });
        } else {
          Progress
            .destroy({ where: { id } })
            .then(() => {
              res.status(204).send();
          });
      }
    });
}

module.exports = { createProgress, getProgressById, updateProgress, deleteProgress }