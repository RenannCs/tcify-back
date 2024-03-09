const Banco = require('./Model/Database');

//Conexão com o banco de dados
const banco = new Banco();
const client = banco.connect();

const express = require('express');
const app = express();

//Inicializa as rotas de TCC, passando como parâmentro o app e o client
const rotas_TCC = require('./Routes/routes')
rotas_TCC(app, client);

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.listen(3000, function () {
  console.log('Servidor rodando da porta: http://localhost:3000/repositorios/tcc')
});
