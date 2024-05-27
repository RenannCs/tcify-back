const express = require('express');
const app = express();
const Database = require("./Model/Database")



const routes = require('./Routes/routes')
const cors = require('cors');
routes(app);

app.use(express.json());
app.use('/Uploads', express.static('Uploads'));
app.use('/Default' , express.static('Default'));

const database = new Database();
database.conect();

app.use(cors({
  origin: ['http://localhost:5173/']
}));


app.listen(3000, function () {
  console.log('Servidor rodando da porta: http://localhost:3000/')
});
