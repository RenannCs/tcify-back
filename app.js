const express = require('express');
const app = express();
const Database = require("../tcify-back/Model/Database");


const routes = require('./Routes/routes')
const cors = require('cors');
routes(app);

app.use(express.json())


const database = new Database();
database.conect();

app.use(cors({
  origin: ['http://localhost:5173/']
}));


app.listen(3000, function () {
  console.log('Servidor rodando da porta: http://localhost:3000/repositorios/tcc')
});
