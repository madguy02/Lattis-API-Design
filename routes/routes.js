const express = require('express');
const router = express.Router();
const connection = require('../connection/createConnection');

exports.register = function(req,res){
    var users={
      "first_name":req.body.first_name,
      "last_name":req.body.last_name,
      "username":req.body.username,
      "password":req.body.password,
      "birthDate": req.body.birthDate
    }
    connection.query('INSERT INTO User SET ?',users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
    }
    });
  }

