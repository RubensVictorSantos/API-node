const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'Ladera*610892',
  database : 'db_api'
});

module.exports = connection;