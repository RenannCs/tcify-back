const readAllAdmin = require('../Control/Admin/ReadAllController');
const singleAdmin = require('../Control/Admin/ReadOneController')

const readAllTcc = require('../Control/Tcc/ReadAllController');
const singleTcc = require('../Control/Tcc/ReadOneController');
const readTccByCourse = require('../Control/Tcc/ReadByCourseController');
const readTccByYear = require('../Control/Tcc/ReadByYearController');
const deleteTcc = require('../Control/Tcc/DeleteController');
const updateTcc = require('../Control/Tcc/UpdateController');
const insertTcc = require('../Control/Tcc/InsertController');

module.exports = function (app) {
    const express = require('express');

    app.use(express.json())

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
    //----------------ROTAS TCC----------------//

    //Rota para recuperar todos os TCCs
    app.get('/repositorios/tcc', readAllTcc.read);

    //Rota para recuperar um TCC por ID
    app.get('/repositorios/tcc/:id', singleTcc.read);

    //Rota para recuperar todos os TCCs de um curso pelo ID do curso
    app.get('/repositorios/tcc/curso/:id', readTccByCourse.read);

    //Recupera os TCCs de um determinado ano
    app.get('/repositorios/tcc/ano/:ano', readTccByYear.read);

    //Rota para deletar um TCC 
    app.delete('/repositorios/tcc/:id' , deleteTcc.remove);

    //Rota para atualizar um TCC por id, usando o Body da requisição como dado
    app.patch('/repositorios/tcc/:id', updateTcc.update);

    //Rota para inserir um TCC
    app.post('/repositorios/tcc', insertTcc.insert);

    

    //----------------ROTAS ADMINS----------------//
    app.get('/repositorios/admin' , readAllAdmin.read);

    app.get('/repositorios/admin/:id' , singleAdmin.read);

    

}