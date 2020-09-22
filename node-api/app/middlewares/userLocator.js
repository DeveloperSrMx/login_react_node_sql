const db = require("../models");
const User = db.user;

findUsernameOrEmail = (req, res, next) => {
  // We find by username. It should be unique.
  User.findOne({ where: { username: req.body.username }})
    .then(user => {
      if (user) {
        res.status(400).send({ message: "Username is already in use." });
        return;
      }
    // We find by email. It should be unique.
    User.findOne({ where: { email: req.body.email }})
      .then(user => {
        if (user) {
          res.status(400).send({ message: "Email is already in use." });
          return;
        }
      next();
    });
  });
};

const userLocator = {
  findUsernameOrEmail: findUsernameOrEmail
};

module.exports = userLocator;