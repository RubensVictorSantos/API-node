require("dotenv-safe").config();
const crypto = require('crypto');
const mysql = require('mysql');
const http = require('http');
const jwt = require('jsonwebtoken');
const httpProxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');
const encrypt = require('./senha.js');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const port = 3000;/**Porta padrão */

const userServiceProxy = httpProxy('http://localhost:3001');
const productsServiceProxy = httpProxy('http://localhost:3002');

/**Configurando o body parser para pegar POST mais tarde*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
app.use(logger('dev'));
app.use(helmet());
app.use(cookieParser());

function execSQLQuery(sqlQry, res){

  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'Ladera*610892',
    database : 'db_api'
  });

  connection.query(sqlQry, function(error, results, fields){
    if(error){
      res.json(error);
    }else{

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
      res.setHeader("Access-Control-Allow-Origin", "*");
      console.log(sqlQry);
      console.log("Query Executada: " + JSON.stringify(results))
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

  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'Ladera*610892',
    database : 'db_api'
  });

  if(req.body.nome && req.body.senha){

    const nome = req.body.nome.substring(0,150);
    const senha = req.body.senha.substr(0,11);

      // if (err) throw err;
    
      connection.query(`SELECT id FROM Clientes WHERE nome = '${nome}' AND senha = '${senha}'`, function (err, result, fields) {
        
        var id = JSON.parse(result[0].id);

        if(err){
          res.json(err);
        }else{
          
          var token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
          });
          res.status(200).send({ auth: true, token: token });

          // console.log(result); 

        }
      });
      connection.end();  
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

  console.log(req.params.id)

  if(req.params.id) filter = ' WHERE ID = ' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM Clientes' + filter, res);
    
});

router.delete('/clientes/:id', (req, res, method) =>{
    execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
    // res.redirect('/clientes')
});

router.post('/clientes', (req, res) =>{

  //Tem q ser igual o nome no banco
  const nome = req.body.Nome.substring(0,150);
  const email = req.body.email.substring(0,150);
  const celular = req.body.celular;
  
  execSQLQuery(`INSERT INTO Clientes(Nome, email, celular) VALUES('${nome}','${email}','${celular}')`, res);
});

router.patch('/clientes/:id', (req, res) => {
 
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring(0,150);
  const email = req.body.email.substring(0,150);
  const celular = req.body.celular.substring(0,150);

  execSQLQuery(`UPDATE Clientes SET Nome='${nome}', email='${email}', celular = '${celular}' WHERE ID=${id}`, res);
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

// function encrypt(text) {

//   var mykey = crypto.createCipher('aes-128-cbc', text);
//   var mystr = mykey.update('abc', 'utf8', 'hex')
//   mystr += mykey.final('hex');

//   return mystr


//   // const key = crypto.randomBytes(32);
//   // const iv = crypto.randomBytes(16);
//   // const algorithm = 'aes-256-cbc';

//   // let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//   // let encrypted = cipher.update(text);

//   // encrypted = Buffer.concat([encrypted, cipher.final()]);
//   // return iv.toString('hex');
// }

// function decrypt(text) {
//   let iv = Buffer.from(text.iv, 'hex');
//   let encryptedText = Buffer.from(text.encryptedData, 'hex');
//   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
  
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }

/**Inicia o servidor */
app.listen(port);

console.log('API funcionando!');