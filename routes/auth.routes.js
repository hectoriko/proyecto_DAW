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
          username : user.username,
          userpoints : user.points
        });
      });
    });
  });
});

router.post('/logout', (req, res) => {
  const token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (!user) return res.status(400).json({
      error: true,
      message: "Sesión no ha sido inicializada"
    });
    user.deleteToken(token, (err, user) => {
      if (err) return res(err);
      res.clearCookie('auth').json({
        isAuth: false,
        message: "Sesión ha sido cerrada"
      });
    });
  });
});

router.post('/updatePoints', (req, res) => {
  const token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (!user) return res.status(401).json({
      error: true,
      message: "Unauthorized access"
    });
    const newPoints = req.body.points;
    user.points = user.points + newPoints;
    user.save((err, updatedUser) => {
      if (err) return res.status(400).send(err);
      res.json({
        success: true,
        message: "Points updated successfully",
        user: updatedUser
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

/* Ruta a todos los usuarios */
router.get('/getUsers', async (req, res) => {
  try {
      let users = await User.find();
      res.json(users);
  } catch(err) {
      res.status(500).json({message: err.message});
  }
});

/* Ruta a todos los por orden de puntos */
router.get('/getRanking', async (req, res) => {
  try {
      let users = await User.find();
      // Sort users by points
      users.sort((a, b) =>  {
        if (a.points === null || a.points === undefined || a.points === "") a.points = 0;
        if (b.points === null || b.points === undefined || b.points === "") b.points = 0;
        return b.points - a.points
      })

      res.json(users);
  } catch(err) {
      res.status(500).json({message: err.message});
  }
});

const getUserInfo = (req, res, next) => {
  const token = req.cookies.auth;
  if (!token) {
    return res.json({
      isAuth: false,
      message: 'No se encontró cookie de autenticación'
    });
  }
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (!user) {
      return res.json({
        isAuth: false,
        message: 'No se encontró usuario con el token de autenticación proporcionado'
      });
    }
    res.json({
      isAuth: true,
      id: user._id,
      username: user.username,
      userpoints: user.points
    });
  });
};

router.get('/user', getUserInfo, (req, res) => {
  // The user information is available in the response object
  const { isAuth, id, username, userpoints } = res.locals;
  res.json({
    isAuth,
    id,
    username,
    userpoints
  });
});



/* EXPORTS */
module.exports = router;
