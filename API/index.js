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

      console.log(`
        Query Executada: ${sqlQry} \n
        Resultado: ${JSON.stringify(results)} \n`
      );

      res.json(results)
    }
  });
}

/**Definindo as rotas */

const router = express.Router()

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

// router.get('/cliente', verifyJWT, (req, res) => {
//   let select = 'SELECT * FROM tbl_cliente ORDER BY id_cliente DESC LIMIT 5'
//   execSQLQuery(select, res)
// })

router.get('/cliente', (req, res) => {

  let select = 'SELECT * FROM tbl_cliente ORDER BY id_cliente DESC'

  execSQLQuery(select, res)
})

router.get('/funcionario', (req, res) => {
  let select = 'SELECT * FROM tbl_login_funcionario ORDER BY id_login_funcionario DESC LIMIT 5'
  execSQLQuery(select, res)
})

router.get('/cliente/:id', (req, res,) => {
  if (req.params.id) {
    let id = parseInt(req.params.id)
    let select = 'SELECT * FROM tbl_cliente WHERE id_cliente = ' + id
    execSQLQuery(select, res)
  }
})

router.get('/funcionario/:id', (req, res,) => {
  if (req.params.id) {
    let id = parseInt(req.params.id)
    let select = 'SELECT * FROM tbl_login_funcionario WHERE id_login_funcionario = ' + id
    execSQLQuery(select, res)
  }
})

router.delete('/cliente/:id', (req, res, next) => {
  let id = parseInt(req.params.id)
  let select = 'DELETE FROM tbl_cliente WHERE id_cliente = ' + id
  execSQLQuery(select, res)

})

router.delete('/funcionario/:id', (req, res, next) => {
  let id = parseInt(req.params.id)
  let select = 'DELETE FROM tbl_cliente WHERE id_login_funcionario = ' + id
  execSQLQuery(select, res)

})

router.post('/cadastrar/funcionario', (req, res) => {

  let nome = req.body.nome
  let senha = req.body.senha
  let status = req.body.status
  let nivel = req.body.nivel

  let select = `INSERT INTO tbl_login_funcionario(nome,senha,nivel,status) VALUE ('${nome}','${senha}',${nivel},'${status}')`;

  execSQLQuery(select, res);

})

router.post('/cadastrar/cliente', (req, res) => {

  let email = req.body.email
  let senha = req.body.senha

  let select = `INSERT INTO tbl_login_cliente(email,senha) VALUE ('${email}','${senha}')`;

  execSQLQuery(select, res);

})

router.post('/cliente', (req, res) => {

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
    `INSERT INTO tbl_cliente(nome, 
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

router.patch('/cliente/:id', (req, res) => {

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

  execSQLQuery(`UPDATE tbl_cliente SET 
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
  WHERE id_cliente = ${id}`, res)
})

//authentication
router.post('/login/cliente', (req, res, next) => {

  let email = req.body.email
  let senha = req.body.senha

  let select = `SELECT * FROM tbl_login_cliente WHERE email = '${email}' AND senha = '${senha}'`

  connection.query(select, function (error, result, fields) {

    if (result[0] == undefined) {
      res.status(404).send('Usuário não encontrado');

    } else {

      if (error) {
        res.json(error)
      } else {

        const id = parseInt(result[0].id)

        if (!isNaN(id)) {

          // auth ok
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
          });
          res.status(200).send({ auth: true, token: token })

        } else {
          res.status(500).send('Login inválido!');
        }
      }
    }
  })
})

router.post('/login/funcionario', (req, res, next) => {

  let nome = req.body.nome
  let senha = req.body.senha

  console.log(req.body.nome +
    "\n" + req.body.senha);

  let select = `SELECT * FROM tbl_login_funcionario WHERE nome = '${nome}' AND senha = '${senha}'`


  connection.query(select, function (error, result, fields) {

    if (result[0] == undefined) {
      res.status(404).send('Usuário não encontrado');

    } else {

      if (error) {
        res.json(error)
      } else {

        const id = parseInt(result[0].id)

        console.log(isNaN(id))
        if (isNaN(id)) {

          // auth ok
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
          });
          res.status(200).send({ auth: true, token: token })

        } else {
          res.status(500).send('Login inválido!');
        }
      }
    }
  })
})

router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null })
})

app.use('/', router)

function verifyJWT(req, res, next) {
  let token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // Se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

/** Inicia o servidor */
app.listen(process.env.PORT)