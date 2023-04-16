/*
 * Declaración de las rutas para autentificación
 */
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const auth = (req, res, next) => {
  const token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({error: true});
    req.token = token;
    req.user = user;
    next();
  });
}

/* Ruta para iniciar sesión de usuario */
router.post('/login', (req, res) => {
  const token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (user) return res.status(400).json({
      error : true,
      message : "Sesión ya ha sido inicializada"
    });
    User.findOne({'username' : req.body.username}, (_err, user) => {
      if (!user) return res.json({
        isAuth : false,
        message : "Credeciales no validos"
      });
      user.comparePassword(req.body.password, (_err, isMatch) => {
        if (!isMatch) return res.json({ 
          isAuth : false,
          message : "Credeciales no validos"
        });
      });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({
          isAuth : true,
          id : user._id,
          username : user.username
        });
      });
    });
  });
});

/* Ruta para crear nuevo usuario */
router.post('/register', (req, res) => {
  const new_user = new User(req.body);
  User.findOne({username: new_user.username}, (_err, user) => {
    if (user) return res.status(400).json({ auth : false, message : "user exists"});
    new_user.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success : false });
      }
      res.status(200).json({
        success : true,
        user : doc
      });
    });
  });
});

/* Ruta para cerrar sesión de usuario */
router.get('/logout', auth, function(req, res) {
  req.user.deleteToken(req.token, (err, _user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

/* EXPORTS */
module.exports = router;
