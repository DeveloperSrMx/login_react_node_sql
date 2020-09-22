const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  // We store user in database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.status(201).send({ message: "User has been successfully registered. Please login." });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  // We compare the username of the request against the one obtained in the database
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Wrong credentials, username does not exist." });
      }

      // We compare the password of the request against the one obtained in the database
      var isValidPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).send({
          accessToken: null,
          message: "Wrong credentials: failed password."
        });
      }

      // We sign the token with the user's id, secret and duration until it expires (24 hrs).
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};