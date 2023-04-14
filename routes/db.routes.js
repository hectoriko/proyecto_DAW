/*
 * Rutas a BBDD
 */
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Puzzle = require('../models/puzzle.js') 
const User = require('../models/user.js')
const config = require("../config/auth.config");
module.exports = router;



/*
 * Esta ruta nos permite obtener de la BBDD un objeto puzzle del nivel pasado
 * como parametro, por ahora tenemos:
 * /api/getRandom/hard
 * /api/getRandom/medium
 * /api/getRandom/easy
 */
router.get('/getRandom/:level', async (req, res) => {
    try {
        const level = req.params.level;
        await Puzzle.countDocuments({level: level}).exec((err, count) => {
            const random = Math.floor(Math.random() * count);
            Puzzle.findOne({level: level}).skip(random).exec((err, puzzle) => {
                res.json(puzzle);
            });
        });
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

/* Ruta a todos los objetos puzzle en la BBDD. */
router.get('/getAll', async (req, res) => {
    try {
        const puzzles = await Puzzle.find();
        res.json(puzzles);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});
 
/* Ruta para añadir usuario */
exports.signup = (req, res) => {
  const user = new User({
    user_name: req.body.user_name,
    email: req.body.email,
    password_hash: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// // /users/:userId/password/:password
// router.get('/login/:user_name', async (req, res) => {
//     try {
//         const user = req.params.user_name;

//     } catch(err) {
//         res.status(500).json({message: err.message});
//     }
// });
||||||| Stash base
// // /users/:userId/password/:password
// router.get('/login/:user_name', async (req, res) => {
//     try {
//         const user = req.params.user_name;
//         console.log("🚀 BACK - user:", user)
        
//     } catch(err) {
//         res.status(500).json({message: err.message});
//     }
// });
=======
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
>>>>>>> Stashed changes
||||||| Stash base
// // /users/:userId/password/:password
// router.get('/login/:user_name', async (req, res) => {
//     try {
//         const user = req.params.user_name;
//         console.log("🚀 BACK - user:", user)
        
//     } catch(err) {
//         res.status(500).json({message: err.message});
//     }
// });
=======
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
>>>>>>> Stashed changes
||||||| Stash base
// // /users/:userId/password/:password
// router.get('/login/:user_name', async (req, res) => {
//     try {
//         const user = req.params.user_name;
//         console.log("🚀 BACK - user:", user)
        
//     } catch(err) {
//         res.status(500).json({message: err.message});
//     }
// });
=======
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
>>>>>>> Stashed changes

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Define a route for login requests
// app.post('/login', async (req, res) => {
//     // const { username, password } = req.body;
//     const { user_name,
//         password_hash,
//         solved_puzzles,
//         full_name,
//         dob,
//         points } = req.body;
//         // const user = await User.findOne({ user_name, password_hash });
//         console.log("🚀 - user_name:", user_name)
//         console.log("🚀 - password_hash:",  password_hash)

//     // if (user) {
//     //   req.session.userId = user._id;
//     //   res.redirect('/');
//     // } else {
//     //   res.send('Invalid username or password');
//     // }
//   });
||||||| Stash base
// Define a route for login requests
// app.post('/login', async (req, res) => {
//     // const { username, password } = req.body;
//     const { user_name,
//         password_hash,
//         solved_puzzles,
//         full_name,
//         dob,
//         points } = req.body;
//         // const user = await User.findOne({ user_name, password_hash });
//         console.log("🚀 - user_name:", user_name)
//         console.log("🚀 - password_hash:",  password_hash)
        
//     // if (user) {
//     //   req.session.userId = user._id;
//     //   res.redirect('/');
//     // } else {
//     //   res.send('Invalid username or password');
//     // }
//   });
=======
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
>>>>>>> Stashed changes
||||||| Stash base
// Define a route for login requests
// app.post('/login', async (req, res) => {
//     // const { username, password } = req.body;
//     const { user_name,
//         password_hash,
//         solved_puzzles,
//         full_name,
//         dob,
//         points } = req.body;
//         // const user = await User.findOne({ user_name, password_hash });
//         console.log("🚀 - user_name:", user_name)
//         console.log("🚀 - password_hash:",  password_hash)
        
//     // if (user) {
//     //   req.session.userId = user._id;
//     //   res.redirect('/');
//     // } else {
//     //   res.send('Invalid username or password');
//     // }
//   });
=======
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
>>>>>>> Stashed changes
||||||| Stash base
// Define a route for login requests
// app.post('/login', async (req, res) => {
//     // const { username, password } = req.body;
//     const { user_name,
//         password_hash,
//         solved_puzzles,
//         full_name,
//         dob,
//         points } = req.body;
//         // const user = await User.findOne({ user_name, password_hash });
//         console.log("🚀 - user_name:", user_name)
//         console.log("🚀 - password_hash:",  password_hash)
        
//     // if (user) {
//     //   req.session.userId = user._id;
//     //   res.redirect('/');
//     // } else {
//     //   res.send('Invalid username or password');
//     // }
//   });
=======
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
>>>>>>> Stashed changes
