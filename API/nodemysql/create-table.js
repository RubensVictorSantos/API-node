const mysql = require('mysql');

/** Criando a tabela clientes */
function createTable(conn){
 
  const sql = "CREATE TABLE IF NOT EXISTS Clientes (\n"+
              "ID int NOT NULL AUTO_INCREMENT,\n"+
              "Nome varchar(150) NOT NULL,\n"+
              "CPF char(11) NOT NULL,\n"+
              "PRIMARY KEY (ID)\n"+
              ");";

  conn.query(sql, function (error, results, fields){
    if(error) return console.log(error);
    console.log(' Criou a tabela!');
    //addRows(connection)
  });
}

connection.connect(function(err){
  if(err) return console.log(err);
  console.log('Conectou!');
  createTable(connection);
});