var express = require("express");
var register = require('./routes/register');
var login = require('./routes/login');
var bodyParser = require('body-parser');
var app = express();
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
app.use('/api', router);

var server = app.listen(3000, 'localhost', function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at http://%s:%s", host, port);
});