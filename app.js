const express = require('express');
const app = express();



const routes = require('./Routes/routes')
const cors = require('cors');
routes(app);

app.use(express.json())

app.use(cors({
  origin: ['http://localhost:5173/']
}));


app.listen(3000, function () {
  console.log('Servidor rodando da porta: http://localhost:3000/repositorios/tcc')
});
