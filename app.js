const express = require("express");
const register = require('./routes/register');
const login = require('./routes/login');
const lock = require('./routes/locks');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const verifyToken = require('./routes/verifyToken');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

app.get('/', function(req, res){
    res.send('Service is running')
});

router.post('/register',register.register);
router.post('/login',login.login);
router.post('/addLock',verifyToken,lock.registerLock);
router.put('/updateLock/:id',verifyToken, lock.update);
router.put('/deleteLock/:id',verifyToken, lock.delete);
router.delete('/user/:id',verifyToken, login.delete);
router.put('/user/:id',verifyToken, login.update);
router.get('/list',verifyToken, lock.users);
router.get('/me',verifyToken,login.me);
app.use('/api', router);

var server = app.listen(3000, 'localhost', function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at http://%s:%s", host, port);
});