const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 3000;/**Porta padrão */
const connection = require("./conexao.js");
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

/**Configurando o body parser para pegar POST mais tarde*/
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'))
app.use(helmet())
app.use(cookieParser())

function execSQLQuery(sqlQry, res){

  connection.query(sqlQry, function(error, results, fields){
    if(error){
      res.json(error)
    }else{
      console.log("Query Executada: " + sqlQry );
      // + ";" + JSON.stringify(results))
      console.log("result: " + JSON.stringify(results));
      res.json(results)
    }
  });
}


/**Definindo as rotas */

const router = express.Router()
   
router.get('/',(req, res)=> res.json({message: 'Funcionando'}))
    
router.get('/clientes', verifyJWT, (req, res) =>{
  let select = 'SELECT * FROM tbl_clientes ORDER BY id DESC LIMIT 5'
  execSQLQuery(select , res)
})

router.get('/clientes/:id', (req, res,) =>{
  if(req.params.id){
    let id = parseInt(req.params.id)
    let select = 'SELECT * FROM tbl_clientes WHERE ID = ' + id
    execSQLQuery(select, res)
  }
})

router.delete('/clientes/:id', (req, res, next) =>{
  let id = parseInt(req.params.id)
  let select = 'DELETE FROM tbl_clientes WHERE ID = ' + id
  execSQLQuery(select, res)

})

router.post('/cadastrar', (req, res) =>{

  console.log(
    "Email: " + req.body.email
    + "\nSenha: " + req.body.senha
  );

  let email = req.body.email
  let senha = req.body.senha

  execSQLQuery(`INSERT INTO tbl_usuario(nome,senha) VALUE ('${email}','${senha}')`,res);

})

router.post('/clientes', (req, res) =>{

  let nome = req.body.nome
  let email = req.body.email
  let celular = req.body.celular
  let endereco = req.body.endereco
  let numero = req.body.numero
  let bairro = req.body.bairro
  let cidade = req.body.cidade
  let estado = req.body.estado
  let cep = req.body.cep
  let sexo = req.body.sexo

  criptografar(nome)

  execSQLQuery(
  `INSERT INTO tbl_clientes(nome, 
  email, 
  celular, 
  endereco, 
  numero, 
  bairro, 
  cidade, 
  estado, 
  cep,
  sexo) 
  VALUES('${nome}',
  '${email}',
  '${celular}',
  '${endereco}',
  '${numero}',
  '${bairro}',
  '${cidade}',
  '${estado}',
  '${cep}',
  '${sexo}')`, res)

})

router.patch('/clientes/:id', (req, res) => {
 
  let id = parseInt(req.params.id)
  let nome = req.body.nome
  let email = req.body.email
  let celular = req.body.celular
  let endereco = req.body.endereco
  let numero = req.body.numero
  let bairro = req.body.bairro
  let cidade = req.body.cidade
  let estado = req.body.estado
  let cep = req.body.cep
  let sexo = req.body.sexo
  
  execSQLQuery(`UPDATE tbl_clientes SET 
  nome='${nome}', 
  email = '${email}', 
  celular = '${celular}',
  endereco = '${endereco}',
  numero = '${numero}',
  bairro = '${bairro}',
  cidade = '${cidade}',
  estado = '${estado}',
  cep = '${cep}',
  sexo = '${sexo}'
  WHERE ID = ${id}`, res)
})

//authentication
router.post('/login', (req, res, next) => {

  const nome = req.body.nome
  const senha = req.body.senha

  let select = `SELECT * FROM tbl_usuario WHERE nome = '${nome}' AND senha = '${senha}'`

  connection.query(select, function(error, result, fields){
    
    if(result[0] == undefined){
      console.log('Usuário não existe!');
      // res.status(404).send('Usuário não existe');
      // res.send("teste")
      // res.redirect("back")
      res.end()
    }else{
      
      if(error){
        res.json(error)
      }else{
  
        const id = parseInt(result[0].id)
  
        if(!isNaN(id)){
  
          // auth ok
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
          });
          res.status(200).send({ auth: true, token: token })
          
        }else{
          console.log("Erro id")
          res.status(500).send('Login inválido!');
        }
      }
    }
  })
})

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null })
})

app.use('/',router)

function verifyJWT(req, res, next){
  let token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // Se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

/**Inicia o servidor */
app.listen(port)