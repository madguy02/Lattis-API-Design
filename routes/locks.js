const express = require('express');
const router = express.Router();
const connection = require('../connection/createConnection');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const verifyToken = require('./verifyToken');

const registerQuery = 'INSERT INTO `Lock` UNIQUE KEY(macid, first_name, username) VALUES (?, ?, ?)';//sql query to register lock


exports.registerLock = function(req,res){
   var macid = uuid();
   let locks = {
    "macid": macid,
    "first_name": req.body.first_name,
     "username": req.body.username
   }
    connection.query(registerQuery, [locks.macid, locks.first_name, locks.username], function (error, results, fields) {
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
        "success":"lock added sucessfully"
          });
    }
    });
  }


  exports.update = function(req, res) {
     
    let updateQuery = 'UPDATE `Lock` SET username=? WHERE id=?'
      let id = req.params.id;
     let username = req.body.username;

    connection.query(updateQuery,[username, id], function(error, results, fields){
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

  exports.delete = function(req, res) {
    let id = req.params.id;
    
      let deleteQuery = 'DELETE FROM `Lock` WHERE id=?';
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
  
    exports.users = function(req, res) {
  
        let listQuery = 'SELECT username from `Lock`';
        connection.query(listQuery, function(error, results, fields){
          if (error) {
            throw error;
            res.send({
              "code":400,
              "failed":"error ocurred"
            });
          }
  
          else {
            res.send({
              results
                });
          }
  
        });
  
      }

  
    
  /*
  CREATE TABLE `Lock` (
         `id` int(200) NOT NULL AUTO_INCREMENT,
         `macid` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
        `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         PRIMARY KEY (`id`),
         FOREIGN KEY(`id`) REFERENCES `User`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


    CREATE TABLE `User` (
        `id` int(200) NOT NULL AUTO_INCREMENT,
        `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
         `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
         `birthDate` DATE NOT NULL,
         PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


    */
