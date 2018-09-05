var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Service is running')
});

var server = app.listen(3000, 'localhost', function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at http://%s:%s", host, port);
});