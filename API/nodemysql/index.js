const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;/**Porta padrão */
const mysql = require('mysql');
const execSQLQuery = require('./create-table.js');

/**Configurando o body parser para pegar POST mais tarde*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**Definindo as rotas */
const router = express.Router();
    
router.get('/',(req, res)=> res.json({message: 'funcionando'}));
    
router.get('/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM Clientes', res);
});
/** 
router.get('/clientes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Clientes' + filter, res);
});

router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
});

router.post('/clientes', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
    
});*/

app.use('/',router);

/**Inicia o servidor */
app.listen(port);
console.log('API funcionando!');