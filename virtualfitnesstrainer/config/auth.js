// middleware.js

const jwt = require('jsonwebtoken');
const config = require('./keys')

const auth = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided'});
  } else {
    jwt.verify(token, config.SECRET, function (err, decoded) {
      if (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token'} );
      } else {
        req.email = decoded.email;
        req._id = decoded._id;
        next();
      }
    });
  }
}

module.exports = auth