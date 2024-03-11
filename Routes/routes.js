const readAllAdmin = require('../Control/Admin/ReadAllController').read;
const singleAdmin = require('../Control/Admin/SingleController').read;
const deleteAdmin = require('../Control/Admin/DeleteController').remove;
const insertAdmin = require('../Control/Admin/InsertController').insert;
const updateAdmin = require('../Control/Admin/UpdateController').update;

const readAllTcc = require('../Control/Tcc/ReadAllController').read;
const singleTcc = require('../Control/Tcc/SingleController').read;
const readTccByCourse = require('../Control/Tcc/ReadByCourseController').read;
const readTccByYear = require('../Control/Tcc/ReadByYearController').read;
const deleteTcc = require('../Control/Tcc/DeleteController').remove;
const updateTcc = require('../Control/Tcc/UpdateController').update;
const insertTcc = require('../Control/Tcc/InsertController').insert;

module.exports = function (app) {
    const express = require('express');

    app.use(express.json())

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
    //------------------------ROTAS TCC-----------------------//

    //Rota para recuperar todos os TCCs
    app.get('/repositorios/tcc', readAllTcc);

    //Rota para recuperar um TCC por ID
    app.get('/repositorios/tcc/:id', singleTcc);

    //Rota para recuperar todos os TCCs de um curso pelo ID do curso
    app.get('/repositorios/tcc/curso/:id', readTccByCourse);

    //Recupera os TCCs de um determinado ano
    app.get('/repositorios/tcc/ano/:ano', readTccByYear);

    //Rota para deletar um TCC 
    app.delete('/repositorios/tcc/:id' , deleteTcc);

    //Rota para atualizar um TCC por id, usando o Body da requisição como dado
    app.patch('/repositorios/tcc/:id', updateTcc);

    //Rota para inserir um TCC
    app.post('/repositorios/tcc', insertTcc);

    

    //------------------------ROTAS ADMIN-----------------------//

    //Rota para recuperar todos os administradores
    app.get('/repositorios/admin' , readAllAdmin);

    //Rota para recuperar um administrador por ID
    app.get('/repositorios/admin/:id' , singleAdmin);

    //Rota para deletar um adminstrador
    app.delete('/repositorios/admin/:id' , deleteAdmin);

    //Rota para inserir um adminstrador pelos dados recuperados pelo Body
    app.post('/repositorios/admin' , insertAdmin);

    //Rota para atualizar um administrador com os dados passados pelo Body
    app.patch('/repositorios/admin/:id' , updateAdmin); 
}