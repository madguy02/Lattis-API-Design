const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'Lattis'

});

connection.connect(function(err){
    if (err) {
        throw err;
    }
    console.log('Database connected!!');
});

module.exports = connection;