const { User, Progress } = require('../models');

const createUser = (req, res) => {
    const newUser = req.body;

    User
    .create(newUser)
    .then(newUserCreated => res.status(201).json(newUserCreated));
}

const getUsers = (_, res) => {
    User.findAll().then(users => {
        res.status(200).json(users);
    });
}

const getUserById = (req, res) => {
    const { id } = req.params;

    User.findByPk(id, { include: Progress }).then(user => {
        if (!user) {
            res.status(404).json({ error: 'No account found.' });
        } else {
            res.status(200).json(user);
        }
    });
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const newDetails = req.body;
  
    User
      .update(newDetails, { where: { id } })
      .then(([recordsUpdated]) => {
        if (!recordsUpdated) {
          res.status(404).json({ error: 'No account found.' });
      } else {
        User.findByPk(id).then((updatedUser) => {
          res
          .status(200)
          .json(updatedUser);
      }
        )}
    });
}

const deleteUser = (req, res) => {
    const { id } = req.params;
  
    User
      .findByPk(id)
      .then(foundUser => {
        if (!foundUser) {
          res.status(404).json({ error: 'No account found.' });
        } else {
          User
            .destroy({ where: { id } })
            .then(() => {
              res.status(204).send();
          });
      }
    });
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser }