const mysql = require('mysql');
const con = require('./db.js');
exports.connection

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

/**function addRows(conn){
  const sql = "INSERT INTO Clientes(nome, CPF) VALUES ?";
  const values = [
    ['João Silva', '45465178825'],
    ['Paulo Silva', '54556187825'],
    ['Lucas Silva', '44455187725']
  ];


  conn.query(sql, [values], function(error, results, fields){
    if(error)return console.log(error);
    console.log('adicionou registro!');
    conn.end();//fecha a conexão
});
}*/

connection.connect(function(err){
  if(err) return console.log(err);
  console.log('Conectou!');
  createTable(connection);
});