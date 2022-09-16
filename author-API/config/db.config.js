const mysql2 = require('mysql2');


//create a connection to the database

const connection = mysql2.createConnection({
    "host": "127.0.0.1",
    "port": "3306",
    "database": "sharifa",
    "user": "root",
    "password": "root",
    "connection": 2
});

//open the mysql connection
connection.connect(error => {
    if (error) throw error;
    console.log("successfully connected to the database");
});

module.exports = connection;