const express = require('express');
const router = express.Router();
const connection = require('../connection/createConnection');
const bcrypt = require('bcrypt');

exports.login = function(req,res){
    let username= req.body.username;
    let password = req.body.password;
     let loginQuery = 'SELECT * FROM User WHERE username = ?';
    connection.query(loginQuery,[username], function (error, results, fields) {
    if (error) {
        console.log(error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
        
        if (results.length > 0) {
        if(bcrypt.compareSync(password, results[0].password)){
          res.send({
            "code":200,
            "success":"login sucessfull"
              });
            }
        else{
          res.send({
            "code":204,
            "success":"username and password does not match"
              });
        }
     }
      else{
        res.send({
          "code":204,
          "success":"username does not exits"
            });
      }
    }
    });
  }