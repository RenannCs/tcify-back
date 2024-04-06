const readAllTCCs = require('../Control/TCC/ReadAllController').read;
const readTCCsByCourse = require('../Control/TCC/ReadByCourseController').read;
const readTCCsByYear = require('../Control/TCC/ReadByYearController').read;
const singleTCC = require('../Control/TCC/SingleController').read;
const insertTCC = require('../Control/TCC/InsertController').insert;
const updateTCC = require('../Control/TCC/UpdateController').update;
const deleteTCC = require('../Control/TCC/DeleteController').remove;

const readDistinctDatesTCC = require('../Control/TCC/ReadDistinctDatesController').read;

const readAllUsers = require('../Control/User/ReadAllController').read;
const singleUser = require('../Control/User/SingleController').read;
const insertUser = require('../Control/User/InsertController').insert;
const updateUser = require('../Control/User/UpdateController').update;
const deleteUser = require('../Control/User/DeleteController').remove;

const readAllCourses = require('../Control/Course/ReadAllController').read;
const singleCourse = require('../Control/Course/SingleController').read;
const insertCourse = require('../Control/Course/InsertController').insert;
const updateCourse = require('../Control/Course/UpdateController').update;
const deleteCourse = require('../Control/Course/DeleteController').remove;


module.exports = function (app) {
    const express = require('express');
    const multer = require('multer');
    
    const uploadLocal = multer({ dest: 'Uploads/' });
    app.use(express.json())

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

    //------------------------ROTAS TCC-----------------------//

    // Rota para recuperar todos os TCCs
    app.get('/repository/tccs', readAllTCCs);

    // Rota para recuperar todos os TCCs de um curso pelo ID do curso
    app.get('/repository/tccs/course/:id', readTCCsByCourse);

    // Recupera os TCCs de um determinado ano
    app.get('/repository/tccs/year/:year', readTCCsByYear);

    // Rota para recuperar um TCC por ID
    app.get('/repository/tcc/:id', singleTCC);

    // Rota para inserir um TCC
    app.post('/repository/tcc', uploadLocal.fields([
        {name: "image" , maxCount: 1},
        {name: "document" , maxCount: 1},
        {name: "monography" , maxCount: 1},
        {name: "zip" , maxCount: 1}
    ]) ,  insertTCC);

    // Rota para atualizar um TCC por id, usando o Body da requisição como dado
    app.patch('/repository/tcc/:id', updateTCC);

    // Rota para deletar um TCC 
    app.delete('/repository/tcc/:id', deleteTCC);

    //------------------------ROTAS USERS-----------------------//

    // Rota para recuperar todos os usuários
    app.get('/repository/users', readAllUsers);

    // Rota para recuperar um usuário por ID
    app.get('/repository/user/:id', singleUser);

    // Rota para inserir um usuário pelos dados recuperados pelo Body
    app.post('/repository/user', insertUser);

    // Rota para atualizar um usuário com os dados passados pelo Body
    app.patch('/repository/user/:id', updateUser);

    // Rota para deletar um usuário
    app.delete('/repository/user/:id', deleteUser);


    //------------------------ROTAS COURSE-----------------------//

    // Rota para recuperar todos os cursos
    app.get('/repository/courses', readAllCourses);

    // Rota para recuperar um curso por ID
    app.get('/repository/course/:id', singleCourse);

    // Rota para inserir um curso pelos dados recuperados pelo Body
    app.post('/repository/course', insertCourse);

    // Rota para atualizar um curso com os dados passados pelo Body
    app.patch('/repository/course/:id', updateCourse);

    // Rota para deletar um curso
    app.delete('/repository/course/:id', deleteCourse);

    app.get('/repository/tccs/dates', readDistinctDatesTCC);




}
