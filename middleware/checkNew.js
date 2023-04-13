/*
 * Esta función confirmará que el usuario o el correo electronico no existan ya en la BBDD.
 */

const User = require('../models/user');

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    user_name: req.body.user_name
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Sorry, that username is not available :(" });
      return;
    }

    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Sorry, that email is already in use :(" });
        return;
      }

      next();
    });
  });
};

const verifyNew = checkDuplicateUsernameOrEmail;

modules.exports = verifyNew;
