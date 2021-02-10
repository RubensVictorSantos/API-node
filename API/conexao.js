require("dotenv-safe").config();

const mysql = require('mysql');

const con = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

con.connect((err) => {
    if (err) {
        console.log('Erro na conexão com o banco...', err)
        return
    }
    console.log('Conexão com o banco!')
})

module.exports = con
