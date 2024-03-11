const express = require('express');
const app = express();

const routes = require('./Routes/routes')
routes(app);

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.listen(3000, function () {
  console.log('Servidor rodando da porta: http://localhost:3000/repositorios/tcc')
});
