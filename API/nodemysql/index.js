require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;/**Porta padrão */
const mysql = require('mysql');
require('./create-table.js');

/**Configurando o body parser para pegar POST mais tarde*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : 'Ladera*610892',
      database : 'db_api'
    });
    connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
    });
  }


/**Definindo as rotas */
const router = express.Router();

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

//authentication
router.post('/login', (req, res, next) => {
  if(req.body.user === 'luiz' && req.body.pwd === '123'){
    //auth ok
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    res.status(200).send({ auth: true, token: token });
  }
  
  res.status(500).send('Login inválido!');
});

// Proxy request
router.get('/users', verifyJWT, (req, res, next) => {
    userServiceProxy(req, res, next);
})
  
router.get('/products', verifyJWT, (req, res, next) => {
    productsServiceProxy(req, res, next);
})

/**---------------------------------------------------------------------------------------------------------- */   
router.get('/',(req, res)=> res.json({message: 'funcionando'}));
    
router.get('/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM Clientes', res);
});
 
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
    const cpf = req.body.CPF.substr(0,11);
    execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});

router.patch('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substr(0,11);
    execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
})

app.use('/',router);

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if(!token)return res.status(401).send({auth: false, message:'No token provided.'});
    
    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if(err) return res.status(500).send({auth:false, message: 'Failed to authenticate token.'});
        
            /**Se estiver ok, salva no request para uso posterior */
            req.useId = decoded.id;
            next();
    })
}


/**Inicia o servidor */
app.listen(port);
console.log('API funcionando!');