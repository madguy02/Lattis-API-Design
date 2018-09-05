const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'Lattis'

});

connection.connect(function(err){
    if (err) {
        throw err;
    }
    console.log('Database connected!!');
});