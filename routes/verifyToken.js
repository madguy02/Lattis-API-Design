var jwt = require('jsonwebtoken');
var config = require('../config/config');
const uuid = require('uuid');

function verifyToken(req, res, next) {

  var token = req.headers['x-access-token'];
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

    console.log(token);
    console.log(config.secret);
  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
        req.username = decoded.username;
    next();
  });

}

module.exports = verifyToken;