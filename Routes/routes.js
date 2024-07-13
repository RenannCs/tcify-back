module.exports = function (app) {
  const express = require("express");
  const multer = require("multer");

  const uploadLocal = multer({ dest: "Uploads/" });
  const uploadsUserImages = multer({ dest: "Uploads/UsersImages" });
  const uploadsCsv = multer({ dest: "Uploads/CSV" });

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  /*
   * ---------------------------------------ROTAS TCC----------------------------------------------------------
   */

  /* ************** GETS ************** */
  app.get("/repository/tccs", require("../Control/Tcc/all"));

  app.get("/repository/tccs/table", require("../Control/TCC/allTable"));

  app.get(
    "/repository/tccs/tableAdmin",
    require("../Control/TCC/allTableAdmin")
  );

  app.get("/repository/tcc/:id", require("../Control/Tcc/single"));

  app.get(
    "/repository/tcc/student/:id",
    require("../Control/Tcc/singleByStudent")
  );

  app.get(
    "/repository/tccs/table/professor/:id",
    require("../Control/Tcc/allTableProfessor")
  );

  app.get(
    "/repository/tccs/table/public",
    require("../Control/Tcc/allTablePublic")
  );

  /* ************** POST ************** */
  app.post(
    "/repository/tcc",
    uploadLocal.fields([
      { name: "document", maxCount: 1 },
      { name: "monography", maxCount: 1 },
      { name: "zip", maxCount: 1 },
    ]),
    require("../Control/Tcc/insert")
  );

  app.post(
    "/repository/tcc/image/:id",
    uploadLocal.fields([{ name: "image", maxCount: 1 }]),
    require("../Control/Tcc/updateImage")
  );

  /* ************** PATCH ************** */
  app.patch(
    "/repository/tcc/:id",
    uploadLocal.any(),
    require("../Control/Tcc/update")
  );

  app.patch(
    "/repository/tcc/monography/:id",
    uploadLocal.fields([{ name: "monography", maxCount: 1 }]),
    require("../Control/Tcc/updateMonography")
  );

  app.patch(
    "/repository/tcc/document/:id",
    uploadLocal.fields([{ name: "document", maxCount: 1 }]),
    require("../Control/Tcc/updateDocument")
  );

  app.patch(
    "/repository/tcc/zip/:id",
    uploadLocal.fields([{ name: "zip", maxCount: 1 }]),
    require("../Control/Tcc/updateZip")
  );

  /* ************** DELETE ************** */
  app.delete("/repository/tcc/:id", require("../Control/Tcc/Delete"));

  app.delete(
    "/repository/tccs/deleteMany",
    require("../Control/Tcc/deleteMany")
  );

  /*
   * ---------------------------------------ROTAS USERS----------------------------------------------------------
   */

  /* ************** GETS ************** */
  app.get("/repository/users", require("../Control/User/all"));

  app.get("/repository/users/table", require("../Control/User/allTable"));

  app.get(
    "/repository/users/table/administrator",
    require("../Control/User/allTableAdm")
  );

  app.get(
    "/repository/users/table/students",
    require("../Control/User/allTableStudent")
  );

  app.get("/repository/user/:_id", require("../Control/User/single"));

  app.get(
    "/repository/users/teachers",
    require("../Control/User/allTableProfessor")
  );

  /* ************** POSTS ************** */
  app.post("/repository/user", require("../Control/User/insert"));

  app.post("/repository/user/login", require("../Control/User/login"));

  app.post(
    "/repository/user/upload/csv",
    uploadsCsv.single("data"),
    require("../Control/User/csvUser")
  );

  app.post(
    "/repository/user/upload/image/:_id",
    uploadsUserImages.single("image"),
    require("../Control/User/updateImage")
  );

  /* ************** PATCH ************** */
  app.patch("/repository/user/:_id", require("../Control/User/update"));

  app.patch(
    "/repository/admin/user/:_id",
    require("../Control/User/updateAdmin")
  );

  /* ************** DELETE ************** */
  app.delete("/repository/user/:_id", require("../Control/User/delete"));

  app.delete("/repository/users/", require("../Control/User/deleteMany"));
  /* ************** PUT ************** */
  app.put(
    "/repository/user/password",
    require("../Control/User/updatePassword")
  );

  /*
   * ---------------------------------------ROTAS COURSE-------------------------------------------------------
   */

  /* ************** GETS ************** */
  app.get("/repository/courses", require("../Control/Course/all"));

  app.get("/repository/course/:id", require("../Control/Course/single"));

  /* ************** POST ************** */
  app.post("/repository/course", require("../Control/Course/insert"));

  /* ************** PATCH ************** */
  app.patch("/repository/course", require("../Control/Course/update"));

  /* ************** DELETE ************** */
  app.delete("/repository/course/:id", require("../Control/Course/delete"));

  /*
   * ---------------------------------------ROTAS GROUP----------------------------------------------------------
   */

  /* ************** POST ************** */
  app.post("/repository/group", require("../Control/Group/insert"));

  /* ************** GETS ************** */
  app.get(
    "/repository/group/singleByStudent/:id",
    require("../Control/Group/SingleByStudent")
  );

  app.get(
    "/repository/group/singleById/:id",
    require("../Control/Group/Single")
  );

  app.get("/repository/groups", require("../Control/Group/all"));

  app.get("/repository/groups/table", require("../Control/Group/allTable"));

  /* ************** DELETE ************** */
  app.delete("/repository/group/:id", require("../Control/Group/delete"));

  app.delete(
    "/repository/groups/deleteMany",
    require("../Control/Group/deleteMany")
  );

  /* ************** PATCH ************** */
  app.patch(
    "/repository/group/insertStudent",
    require("../Control/Group/insertStudent")
  );

  app.patch(
    "/repository/group/deleteStudent",
    require("../Control/Group/deleteStudent")
  );

  app.patch(
    "/repository/group/updateStatus",
    require("../Control/Group/updateStatus")
  );

  app.patch("/repository/group/accept", require("../Control/Group/accept"));
};

/**
 *
 * IMPORTS PARA TCC
 *
 

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
*/

/**
 *
 * IMPORTS PARA USUARIOS
 *
 
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
*/

/**
 *
 * IMPORTS PARA CURSOS
 * 
const readAllCourses = require("../Control/Course/all");
const singleCourse = require("../Control/Course/single");
const insertCourse = require("../Control/Course/insert");
const updateCourse = require("../Control/Course/update");
const deleteCourse = require("../Control/Course/delete");
*/

/**
 *
 * IMPORTS PARA GRUPOS
 *
 
const insertGroup = require("../Control/Group/insert");
const singleGroupByStudent = require("../Control/Group/SingleByStudent");
const singleGroupById = require("../Control/Group/Single");
const deleteGroup = require("../Control/Group/delete");
const insertStudentGroup = require("../Control/Group/insertStudent");
const deleteStudentGroup = require("../Control/Group/deleteStudent");
const acceptGroup = require("../Control/Group/accept");
const allGroup = require("../Control/Group/all");
const updateStatus = require("../Control/Group/updateStatus");
*/
