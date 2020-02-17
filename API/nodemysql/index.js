require("dotenv-safe").config();

const http = require('http');
const jwt = require('jsonwebtoken');
const httpProxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;/**Porta padrão */
const connection = require('./db.js');
const userServiceProxy = httpProxy('http://localhost:3001');
const productsServiceProxy = httpProxy('http://localhost:3002');

/**Configurando o body parser para pegar POST mais tarde*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(helmet());
app.use(cookieParser());

function execSQLQuery(sqlQry, res){

  exports.connection

  connection.query(sqlQry, function(error, results, fields){
    if(error){
      res.json(error);
    }else{
      // console.log(res);
      // console.log("Query Executada: " + JSON.stringify(results))
      res.json(results)
    }
  });
}

/**Definindo as rotas */
const router = express.Router();

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

//authentication
router.post('/login', (req, res, next) => {
  
  exports.connection

  if(req.body.nome && req.body.senha){

    const nome = req.body.nome.substring(0,150);
    const senha = req.body.senha.substr(0,11);

    connection.connect(function(err) {
      if (err) throw err;
    
      connection.query(`SELECT id FROM Clientes WHERE nome = '${nome}' AND senha = '${senha}'`, function (err, result, fields) {
      
        if (err) throw err;

        var id = JSON.parse(result[0].id);
        
            
        var token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300 // expires in 5min
        });
        
        res.status(200).send({ auth: true, token: token });
        
      });
      // connection.end();
    });
    
    // res.end();

  }else{
    res.status(500).send('Login inválido!');
  }

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

router.get('/clientes/:id', (req, res,) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID = ' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Clientes' + filter, res);
    
});

router.delete('/clientes/:id', (req, res, method) =>{
    execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
    console.log('Cliente deletado com sucesso!');
    // res.redirect('/clientes')
});

router.post('/clientes', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substr(0,11);
    execSQLQuery(`INSERT INTO Clientes(Nome, cpf, senha) VALUES('${nome}','${cpf}','${senha}')`, res);
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

// var server = http.createServer(app);
// server.listen(3000);


console.log('API funcionando!');