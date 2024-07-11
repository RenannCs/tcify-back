/**
 *
 * IMPORTS PARA TCC
 *
 */

const allTableTCCs = require("../Control/TCC/allTable");
const allTableAdminTCCs = require("../Control/TCC/allTableAdmin");
const allTableProfessorTcc = require("../Control/Tcc/allTableProfessor");
const allTablePublic = require("../Control/Tcc/allTablePublic");
const singleTCC = require("../Control/Tcc/single");
const insertTCC = require("../Control/Tcc/insert");
const updateTCC = require("../Control/Tcc/update");
const deleteTCC = require("../Control/Tcc/Delete");
const updateImageTcc = require("../Control/Tcc/updateImage");
const updateMonography = require("../Control/Tcc/updateMonography");
const updateDocument = require("../Control/Tcc/updateDocument");
const updateZip = require("../Control/Tcc/updateZip");
const singleTccByStudent = require("../Control/Tcc/singleByStudent");
/**
 *
 * IMPORTS PARA USUARIOS
 *
 */
const readAllUsers = require("../Control/User/all");
const allTableUsers = require("../Control/User/allTable");
const singleUser = require("../Control/User/single");
const insertUser = require("../Control/User/insert");
const updateUser = require("../Control/User/update");
const deleteUser = require("../Control/User/delete");
const loginUser = require("../Control/User/login");
const updatePasswordUser = require("../Control/User/updatePassword");
const updateImageUser = require("../Control/User/updateImage");
const studentCsv = require("../Control/User/csvStudent");
const allTeachers = require("../Control/User/allTableProfessor");
const allTableAdmin = require("../Control/User/allTableAdm");
const allTableProfessor = require("../Control/User/allTableProfessor");
const allTableStudent = require("../Control/User/allTableStudent");

const deleteManyUsers = require("../Control/User/deleteMany");

/**
 *
 * IMPORTS PARA CURSOS
 *
 */
const readAllCourses = require("../Control/Course/all");
const singleCourse = require("../Control/Course/single");
const insertCourse = require("../Control/Course/insert");
const updateCourse = require("../Control/Course/update");
const deleteCourse = require("../Control/Course/delete");

/**
 *
 * IMPORTS PARA GRUPOS
 *
 */
const insertGroup = require("../Control/Group/insert");
const singleGroupByStudent = require("../Control/Group/SingleByStudent");
const singleGroupById = require("../Control/Group/Single");
const deleteGroup = require("../Control/Group/delete");
const insertStudentGroup = require("../Control/Group/insertStudent");
const deleteStudentGroup = require("../Control/Group/deleteStudent");
const acceptGroup = require("../Control/Group/accept");
const allGroup = require("../Control/Group/all");
const updateStatus = require("../Control/Group/updateStatus");
//const sendemail = require('../Control/Email/testesend');

module.exports = function (app) {
  const express = require("express");
  const multer = require("multer");

  const uploadLocal = multer({ dest: "Uploads/" });
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  /**
   * *******************************************************
   * *******************************************************
   * *******************************************************
   * ------------------------ROTAS TCC----------------------
   * *******************************************************
   * *******************************************************
   * *******************************************************
   */

  /* ************** GETS ************** */
  app.get("/repository/tccs", require("../Control/Tcc/all"));

  app.get("/repository/tccs/table", require("../Control/TCC/allTable"));

  app.get("/repository/tccs/tableAdmin", allTableAdminTCCs);

  app.get("/repository/tcc/:id", singleTCC);

  app.get("/repository/tcc/student/:id", singleTccByStudent);

  app.get("/repository/tccs/table/professor/:id" , allTableProfessorTcc);

  app.get("/repository/tccs/table/public" , allTablePublic);

  /* ************** POST ************** */
  app.post(
    "/repository/tcc",
    uploadLocal.fields([
      { name: "document", maxCount: 1 },
      { name: "monography", maxCount: 1 },
      { name: "zip", maxCount: 1 },
    ]),
    insertTCC
  );

  app.post(
    "/repository/tcc/image/:id",
    uploadLocal.fields([{ name: "image", maxCount: 1 }]),
    updateImageTcc
  );

  /* ************** PATCH ************** */
  app.patch("/repository/tcc/:id", uploadLocal.any(), updateTCC);

  app.patch(
    "/repository/tcc/monography/:id",
    uploadLocal.fields([{ name: "monography", maxCount: 1 }]),
    updateMonography
  );

  app.patch(
    "/repository/tcc/document/:id",
    uploadLocal.fields([{ name: "document", maxCount: 1 }]),
    updateDocument
  );

  app.patch(
    "/repository/tcc/zip/:id",
    uploadLocal.fields([{ name: "zip", maxCount: 1 }]),
    updateZip
  );

  /* ************** DELETE ************** */
  app.delete("/repository/tcc/:id", deleteTCC);

  app.delete("/repository/tccs/deleteMany" , require("../Control/Tcc/deleteMany"))

  /**
   * *******************************************************
   * *******************************************************
   * *******************************************************
   *------------------------ROTAS USERS-----------------------
   * *******************************************************
   * *******************************************************
   * *******************************************************
   */

  /* ************** GETS ************** */
  app.get("/repository/users", readAllUsers);

  app.get("/repository/users/table", allTableUsers);

  app.get("/repository/users/table/administrator" , allTableAdmin);

  app.get("/repository/users/table/professor", allTableProfessor);

  app.get("/repository/users/table/students" , allTableStudent);

  app.get("/repository/user/:id", singleUser);

  app.get("/repository/users/teachers", allTeachers);

  /* ************** POSTS ************** */
  app.post("/repository/user", uploadLocal.any(), insertUser);

  app.post("/repository/user/login", loginUser);

  app.post(
    "/repository/users/csv",
    uploadLocal.fields([{ name: "data", maxCount: 1 }]),
    studentCsv
  );

  app.post(
    "/repository/users/image/:id",
    uploadLocal.fields([{ name: "image", maxCount: 1 }]),
    updateImageUser
  );

  /* ************** PATCH ************** */
  app.patch("/repository/user/:id", updateUser);

  app.patch("/repository/user/updateAdmin/:id" , require("../Control/User/updateAdmin"))
  

  /* ************** DELETE ************** */
  app.delete("/repository/user/:id", deleteUser);

  app.delete("/repository/users/deleteMany" , deleteManyUsers);
  /* ************** PUT ************** */
  app.put("/repository/user/password", updatePasswordUser);

  /**
   * *******************************************************
   * *******************************************************
   * *******************************************************
   *------------------------ROTAS CURSO-----------------------
   * *******************************************************
   * *******************************************************
   * *******************************************************
   */

  /* ************** GETS ************** */
  app.get("/repository/courses", readAllCourses);

  app.get("/repository/course/:id", singleCourse);

  /* ************** POST ************** */
  app.post("/repository/course", insertCourse);

  /* ************** PATCH ************** */
  app.patch("/repository/course", updateCourse);

  /* ************** DELETE ************** */
  app.delete("/repository/course/:id", deleteCourse);

  /**
   * *******************************************************
   * *******************************************************
   * *******************************************************
   *------------------------ROTAS GRUPO-----------------------
   * *******************************************************
   * *******************************************************
   * *******************************************************
   */

  /* ************** POST ************** */
  app.post("/repository/group", insertGroup);

  /* ************** GETS ************** */
  app.get("/repository/group/singleByStudent/:id", singleGroupByStudent);

  app.get("/repository/group/singleById/:id", singleGroupById);

  app.get("/repository/groups", allGroup);

  app.get("/repository/groups/table" , require("../Control/Group/allTable"));

  /* ************** DELETE ************** */
  app.delete("/repository/group/:id", deleteGroup);

  app.delete("/repository/groups/deleteMany" , require("../Control/Group/deleteMany"))

  /* ************** PATCH ************** */
  app.patch("/repository/group/insertStudent", insertStudentGroup);

  app.patch("/repository/group/deleteStudent", deleteStudentGroup);

  app.patch("/repository/group/updateStatus", updateStatus);

  app.patch("/repository/group/accept", acceptGroup);
  //app.get('/teste' , sendemail)
};
