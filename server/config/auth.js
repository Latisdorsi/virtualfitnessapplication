// middleware.js

const jwt = require('jsonwebtoken');

const secret = 'asd2130asdE#asdd@'

const auth = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        console.log('Not a server issue')
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = auth