const jwt = require('jsonwebtokens');
const config = require('../configs/auth.config.js')
const User = require('../models/user.js')

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided! >:" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized! >:" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authjsonwt = verifyToken;
