const { User } = require('../models');

const createUser = (req, res) => {
    const newUser = req.body;

    User
    .create(newUser)
    .then(newUserCreated => res.status(201).json(newUserCreated));
}

module.exports = { createUser }