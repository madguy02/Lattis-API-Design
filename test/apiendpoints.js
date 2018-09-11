/*
The unit tests written here are trivial tests written
to provide a sanity check to API.
More work on tests required
*/

// Demo tests 

let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST Register User', function(){
    it ('it should post details to register a User', function(done){
        let user = {
            "first_name": "test",
            "last_name": "test",
            "username": "test`123",
            "password": "pass",
            "birthDate": "1996-02-07"

        };

        chai.request('http://localhost:3000')
            .post('/api/register')
            .send(user)
            .end(function(err, res){
                res.should.have.status(200);
              done();
            })
    });
});

describe('/POST Login User', function(){
    it ('it should post details to login a User', function(done){
        
        let user = {
            "username": "test`123",
            "password": "pass"
        };

        chai.request('http://localhost:3000')
            .post('/api/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(user)
            .end(function(err, res){
                res.should.have.status(200);
              done();
            })
    });
});