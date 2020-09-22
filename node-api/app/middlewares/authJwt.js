const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let bearerToken = req.headers["authorization"];
  let token = bearerToken ? bearerToken.replace('Bearer ', '') : bearerToken; 
  if (!token) {
    return res.status(403).send({ message: "Forbidden: token not provided. 😕" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) { 
      return res.status(401).send({ message: "Unauthorized. 👨‍✈️" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken
};

module.exports = authJwt;