const express = require('express');
const router = express.Router();
const connection = require('../connection/createConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const verifyToken = require('./verifyToken');

exports.login = function(req,res){
    let id = req.params.id;
    let username= req.body.username;
    let password = req.body.password;
     let loginQuery = 'SELECT * FROM User WHERE username = ?';
    connection.query(loginQuery,[username, password], function (error, results, fields) {
    if (error) {
        console.log(error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
      
    }else{
        
        if (results.length > 0) {
          var token = jwt.sign({ username: username }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
        if(bcrypt.compareSync(password, results[0].password)){
          res.send({
            "code":200,
            "success":"login sucessfull",
            "token": token
              });
              
            }
        else{
          res.send({
            "code":204,
            "success":"username and password does not match"
              });
              
        }
     }
    else {
        res.send({
          "code":204,
          "success":"username does not exits",
        
            });
          } 
      
    }
    });
  }

  exports.delete = function(req, res) {
    let id = req.params.id;
    
      let deleteQuery = 'DELETE FROM User WHERE id=?';
      connection.query(deleteQuery, [id], function(error, results, fields){
        if (error) {
          throw error;
          res.send({
            "code":400,
            "failed":"error ocurred"
          });
        }

        else {
          res.send({
            "code":200,
            "success":"delete sucessfull"
              });
        }

      });

    }

  exports.update = function(req, res) {
     
    let updateQuery = 'UPDATE User SET first_name=?, last_name=?, birthDate=? WHERE id=?'
      let id = req.params.id;
      console.log("Thar"+id);
     let first_name = req.body.first_name;
     let last_name = req.body.last_name;
     let birthDate = req.body.birthDate;

    connection.query(updateQuery,[first_name,last_name,birthDate,id], function(error, results, fields){
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
          "success":"user updated successfully"
            });
      }
      });
  }
  exports.me = function(req, res) {
    
    var meQuery = 'SELECT * FROM User WHERE username = ?'
      connection.query(meQuery,[req.username], function(error, results, fields){
        // console.log(decoded);
        if (error) {
          throw error;
          res.send({
            "code": 400,
          })
        }
        else {
          res.send({
            "code": 200,
            results
          })
        }
      })
  }
  
