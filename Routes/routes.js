const readAllTCCs = require("../Control/Tcc/All");
const allTableTCCs = require("../Control/TCC/AllTable")
const readTCCsByCourse = require("../Control/Tcc/AllByCourse");
const readTCCsByYear = require("../Control/Tcc/AllByYear");
const singleTCC = require("../Control/Tcc/Single");
const insertTCC = require("../Control/Tcc/Insert");
const updateTCC = require("../Control/Tcc/Update");
const deleteTCC = require("../Control/Tcc/Delete");
const updateImageTcc = require("../Control/Tcc/UpdateImg");

const readDistinctDatesTCC = require("../Control/Tcc/DistinctDates");

const readAllUsers = require("../Control/User/ReadAllController");
const allTableUsers = require("../Control/User/AllTable");
const singleUser = require("../Control/User/SingleController");
const insertUser = require("../Control/User/InsertController");
const updateUser = require("../Control/User/UpdateController");
const deleteUser = require("../Control/User/DeleteController");
const loginUser = require("../Control/User/LoginController");
const updatePasswordUser = require("../Control/User/UpdatePassword");

const readAllCourses = require("../Control/Course/ReadAllController");
const singleCourse = require("../Control/Course/SingleController");
const insertCourse = require("../Control/Course/InsertController");
const updateCourse = require("../Control/Course/UpdateController");
const deleteCourse = require("../Control/Course/DeleteController");

module.exports = function (app) {
  const express = require("express");
  const multer = require("multer");

  const uploadLocal = multer({ dest: "Uploads/" });
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  //------------------------ROTAS TCC-----------------------//

  // Rota para recuperar todos os TCCs
  app.get("/repository/tccs", readAllTCCs);

  app.get("/repository/tccs/table", allTableTCCs);

  // Rota para recuperar todos os TCCs de um curso pelo ID do curso
  app.get("/repository/tccs/course/:id", readTCCsByCourse);

  // Recupera os TCCs de um determinado ano
  app.get("/repository/tccs/year/:year", readTCCsByYear);

  // Rota para recuperar um TCC por ID
  app.get("/repository/tcc/:id", singleTCC);

  // Rota para inserir um TCC
  app.post(
    "/repository/tcc",
    uploadLocal.fields([
      { name: "image", maxCount: 1 },
      { name: "document", maxCount: 1 },
      { name: "monography", maxCount: 1 },
      { name: "zip", maxCount: 1 },
    ]),
    insertTCC
  );

  // Rota para atualizar um TCC por id, usando o Body da requisição como dado
  app.patch("/repository/tcc/:id", uploadLocal.any(), updateTCC);

  // Rota para deletar um TCC
  app.delete("/repository/tcc/:id", deleteTCC);

  app.post(
    "/repository/tcc/image/:id",
    uploadLocal.fields([{ name: "image", maxCount: 1 }]),
    updateImageTcc
  );

  //------------------------ROTAS USERS-----------------------//

  // Rota para recuperar todos os usuários
  app.get("/repository/users", readAllUsers);

  app.get("/repository/users/table", allTableUsers);

  
  // Rota para recuperar um usuário por ID
  app.get("/repository/user/:id", singleUser);

  // Rota para inserir um usuário pelos dados recuperados pelo Body
  app.post("/repository/user", uploadLocal.any(), insertUser);

  // Rota para atualizar um usuário com os dados passados pelo Body
  app.patch("/repository/user/:id", uploadLocal.any(), updateUser);

  // Rota para deletar um usuário
  app.delete("/repository/user/:id", deleteUser);

  // Rota para fazer o login de um usuário
  app.post("/repository/user/login", loginUser);

  // Rota para alterar a senha de um usuário
  app.put("/repository/user/password", updatePasswordUser);

  //------------------------ROTAS COURSE-----------------------//

  // Rota para recuperar todos os cursos
  app.get("/repository/courses", readAllCourses);

  // Rota para recuperar um curso por ID
  app.get("/repository/course/:id", singleCourse);

  // Rota para inserir um curso pelos dados recuperados pelo Body
  app.post("/repository/course", insertCourse);

  // Rota para atualizar um curso com os dados passados pelo Body
  app.patch("/repository/course/:id", updateCourse);

  // Rota para deletar um curso
  app.delete("/repository/course/:id", deleteCourse);

  app.get("/repository/tccs/dates", readDistinctDatesTCC);
};
