const jwt = require("jsonwebtoken");
const { privateKey } = require("../config/config");
const response = require("../helpers/response");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const token = req.headers.authorization;

  if (typeof token === "undefined") {
    token = req.headers.token;
    if (typeof token === "undefined") {
      response.sendUnauthorized(res, "Access denied.");
      return;
    }

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        return response.sendForbidden(res, "Invalid token.");
      }
      // set request with decoded token so next middlewares can use it
      req.decodedToken = decoded;
      next();
    });
  } else {
    if (typeof token === "undefined") {
      response.sendUnauthorized(res, "Access denied.");
      return;
    }

    const bearer = token.split(" ");
    jwt.verify(bearer[1], privateKey, (err, decoded) => {
      if (err) {
        return response.sendForbidden(res, "Invalid token.");
      }
      // set request with decoded token so next middlewares can use it
      req.decodedToken = decoded;
      next();
    });
  }
};
