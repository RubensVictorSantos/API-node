const cookie = require('cookie-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require("./conexao.js");
const jwt = require('jsonwebtoken');
const app = express()
require("dotenv-safe").config();
const brcypt = require("bcryptjs");

/**Configurando o body parser para pegar POST mais tarde*/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(cookie())

function execSQLQuery(sqlQry, res) {

  connection.query(sqlQry, function (error, results, fields) {
    if (error) {
      res.json(error)
    } else {

      res.json(results)
    }
  });
}

/** Definindo as rotas */
const router = express.Router()

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });

});

/************************* ROTAS CLIENTE **************************/

/** Traz todos os dados de todos clientes do banco */
router.get('/cliente', (req, res) => {
  let qry = 'SELECT * FROM tbl_cliente ORDER BY id_cliente DESC'

  execSQLQuery(qry, res)
})

/** Traz somente os dados do cliente que esta especificado pelo id */
router.get('/cliente/:id', (req, res,) => {
  let id = parseInt(req.params.id);
  let qry = `SELECT * FROM tbl_cliente WHERE id_cliente = ${id}`

  execSQLQuery(qry, res)
})

/** Adiciona um cliente no banco */
router.post('/cliente', (req, res) => {

  let { nome, email, celular, endereco, numero, bairro, cidade, estado, cep, senha, sexo } = { ...req.body }

  const salt = brcypt.genSaltSync(10);

  const senhaCripto = brcypt.hashSync(senha, salt);

  let qry = `INSERT INTO tbl_cliente( nome, email, celular, endereco, numero, bairro, cidade, estado, cep, senha, sexo) 
    VALUES('${nome}','${email}','${celular}','${endereco}','${numero}','${bairro}','${cidade}','${estado}','${cep}','${senhaCripto}','${sexo}')`

  execSQLQuery(qry, res)

})

/** Altera os dados do cliente que esta especificado pelo id */
router.patch('/cliente/:id', (req, res) => {
  
  let id = parseInt(req.params.id)

  let senha = "5tesS" + req.body.senha;

  console.log(senha);
  const salt = brcypt.genSaltSync(10);

  const senhaCripto = brcypt.hashSync( senha, salt);

  execSQLQuery(`UPDATE tbl_cliente SET 
    nome =    '${req.body.nome}', 
    email =   '${req.body.email}', 
    celular = '${req.body.celular}',
    endereco ='${req.body.endereco}',
    numero =  '${req.body.numero}',
    bairro =  '${req.body.bairro}',
    cidade =  '${req.body.cidade}',
    estado =  '${req.body.estado}',
    cep =     '${req.body.cep}',
    sexo =    '${req.body.sexo}',
    senha =   '${senhaCripto}'
    WHERE id_cliente = ${id}`, res)
})

/** Exclui o cliente do banco */
router.delete('/cliente/:id', (req, res, next) => {

  let id = parseInt(req.params.id)
  let qry = `DELETE FROM tbl_cliente WHERE id_cliente = ${id}`

  execSQLQuery(qry, res)

})

/************************* LOGIN E LOGOUT **************************/

/** Autenticação do cliente, aqui é criado um token para o cliente*/
router.post('/cliente/login', (req, res, next) => {

  let { email, senha } = { ...req.body }

  /** Query busca dados do cliente de acordo com o e-mail e senha passado pelo req.body */
  let qry = `SELECT * FROM tbl_cliente WHERE email = '${email}' AND senha = '${senha}'`

  connection.query(qry, (error, result, fields) => {

    let len = Object.keys(result).length

    if (len < 1) {
      res.status(404).send('Senha e/ou E-mail inválido!');

    } else if (len > 1) {
      res.status(500).send('Existe mais de um cliente com o mesmo login, por favor resolver junto ao T.I.');

    } else {
      const id = parseInt(result[0].id_cliente)

      // Usando JWT para criar um token
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });

      // Retorna um objeto com valores os auth(booleano) confirmando a autenticação e o token 
      res.status(200).send({ auth: true, token: token })

    }
  })
})

/** Rota que precisa de autenticação */
router.get('/cliente_autenticado', verifyJWT, (req, res) => {
  let qry = 'SELECT * FROM tbl_cliente ORDER BY id_cliente DESC LIMIT 5'
  execSQLQuery(qry, res)

})

router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null })
})

app.use('/', router)

/************************* FUNÇÃO AUTENTICAR TOKEN *************************/

function verifyJWT(req, res, next) {
  let token = req.headers['x-access-token'];

  // Verificando se existe token
  if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token fornecido.' });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });

    // Se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;

    console.log(req)

    next();
  });
} 

/** Inicia o servidor */
app.listen(process.env.PORT)