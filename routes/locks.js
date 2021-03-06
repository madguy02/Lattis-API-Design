const express = require('express');
const router = express.Router();
const connection = require('../connection/createConnection');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const verifyToken = require('./verifyToken');

const registerQuery = 'INSERT INTO `Lock` (macid, first_name, lockname) VALUES (?, ?, ?)';//sql query to register lock


exports.registerLock = function(req,res){
   var macid = uuid();
   let locks = {
    "macid": macid,
    "first_name": req.body.first_name,
     "lockname": req.body.lockname
   }
    connection.query(registerQuery, [locks.macid, locks.first_name, locks.lockname], function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      res.send({
        "code":200,
        "success":"lock added sucessfully"
          });
    }
    });
  }


  exports.update = function(req, res) {
     
    let updateQuery = 'UPDATE `Lock` SET lockname=? WHERE id=?'
      let id = req.params.id;
     let lockname = req.body.lockname;

    connection.query(updateQuery,[lockname, id], function(error, results, fields){
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
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
  
        let listQuery = 'SELECT first_name from `Lock`';
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

  
    
  