const express = require('express');
const router = express.Router();
const connection = require('../connection/createConnection');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const registerQuery = 'INSERT INTO User SET ?'; //sql query to register

exports.register = function(req,res){
  var hashValue = bcrypt.hashSync(req.body.password, 10);
    var users={
      "first_name":req.body.first_name,
      "last_name":req.body.last_name,
      "username":req.body.username,
      "password":hashValue,
      "birthDate": req.body.birthDate
    }
    connection.query(registerQuery, users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }
    
    // var token = jwt.sign({ id: users.id }, config.secret, {
    //   expiresIn: 86400
    // });
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
    
    });
  }

