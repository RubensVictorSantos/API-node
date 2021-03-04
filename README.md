# API-Node - exemplo de app Node.js + express + jsonwebtoken + bcryptjs + dotenv-safe
## Instalação
### Prerequisitos da aplicação
* Instalação do server nodejs;
* Recomendado rodar no SO Windows;
* Criar arquivo .env dentro da pasta api com todas as configurações do banco.
```
PORT= Porta que sua api vai rodar

# Jsonwebtoken

SECRET= Sequência de caracteres que será usado para fazer o token  

# Configurações do banco de dados

DB_NAME= Nome do seu banco de dados
DB_USER= Usuário para acessar o banco
DB_HOST= Endereço onde seu banco está hospedado
DB_PORT= Porta que seu banco está usando
DB_PASS= Senha para acessa o banco
```
* Importar o script do banco API-Node/banco/db_api.sql
### Instalação da aplicação
#### Instalação do backend
Acessar a pasta raiz da aplicação no repositório e executar os seguintes comandos:
~~~
  npm install nodemon -g
  npm install
~~~
## Execução
* Executar o arquivo bin/run.bat; e
* Acessar a app no navegador pela URL http://localhost:3333
