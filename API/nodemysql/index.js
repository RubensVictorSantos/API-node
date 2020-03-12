const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 3000;/**Porta padrão */
const connection = require("./conexao.js")

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
      console.log("Query Executada: " + sqlQry + ";" + JSON.stringify(results))
      
      res.json(results)
    }
  });
}

/**Definindo as rotas */

const router = express.Router()
   
router.get('/',(req, res)=> res.json({message: 'Funcionando'}))
    
router.get('/clientes', (req, res) =>{
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

  execSQLQuery(
  `INSERT INTO tbl_clientes(nome, 
  email, 
  celular, 
  endereco, 
  numero, 
  bairro, 
  cidade, 
  estado, 
  cep) 
  VALUES('${nome}',
  '${email}',
  '${celular}',
  '${endereco}',
  '${numero}',
  '${bairro}',
  '${cidade}',
  '${estado}',
  '${cep}')`, res)

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
  
  execSQLQuery(`UPDATE tbl_clientes SET 
  nome='${nome}', 
  email = '${email}', 
  celular = '${celular}',
  endereco = '${endereco}',
  numero = '${numero}',
  bairro = '${bairro}',
  cidade = '${cidade}',
  estado = '${estado}',
  cep = '${cep}'
  WHERE ID = ${id}`, res)
})

app.use('/',router)

/**Inicia o servidor */
app.listen(port)