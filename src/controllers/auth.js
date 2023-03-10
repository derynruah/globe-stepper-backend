const config = require('../config/auth.config');
const { User } = require('../models');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const register = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(res.send({ message: 'User was registered successfully!' }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const signIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Email address and passwords do not match' });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Email address and passwords do not match',
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      res.status(200).send({
        id: user.id,
        email: user.email,
        accessToken: token,
        message: `Welcome ${user.email}, you're now a GlobeStepper!`,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message }, console.log(err));
    });
};

module.exports = { register, signIn }