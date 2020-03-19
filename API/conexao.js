const mysql = require('mysql');

const con = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'Ladera*610892',
    database : 'db_newsite'
});

con.connect((err) => {
    if (err) {
        console.log('Erro na conexão com o banco...', err)
        return
    }
    console.log('Conexão com o banco!')
})

// con.end((err) => {
//     if(err) {
//         console.log('Erro to finish connection...', err)
//         return 
//     }
//     console.log('The connection was finish...')
// })

module.exports = con
