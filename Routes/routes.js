module.exports = function (app) {
  const express = require("express");
  const multer = require("multer");

  const uploadLocal = multer({ dest: "Uploads/" });

  const uploadsUserImages = multer({
    dest: "Uploads/UsersImages",
  });

  const uploadsCsv = multer({ dest: "Uploads/CSV" });

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  const verifyTokenAdmin = require("../Middlewares/verifyTokenAdmin");
  const verifyTokenAdminTeacher = require("../Middlewares/verifyTokenAdminTeacher");
  const verifyTokenAll = require("../Middlewares/verifyTokenAll");
  const verifyTokenStudent = require("../Middlewares/verifyTokenStudent");

  /* ************** Autenticação de Token ********************* */

  app.post("/repository/auth", verifyTokenAll, (request , response) => {
    const arr = {
      status: "SUCCESS",
      message: "Token validado com sucesso!",
    };
    return response.status(200).send(arr);
  });
  /*
   * ---------------------------------------ROTAS TCC----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get("/repository/projects", require("../Control/Tcc/all"));

  app.get("/repository/tccs/admin", require("../Control/TCC/allTableAdmin"));

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
      { name: "image", maxCount: 1 },
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
  app.delete("/repository/project/:id", require("../Control/Tcc/Delete"));

  app.delete("/repository/projects", require("../Control/Tcc/deleteProjects"));

  /*
   * ---------------------------------------ROTAS USERS----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get(
    "/repository/users",
    verifyTokenAdmin,
    require("../Control/User/all")
  );

  app.get(
    "/repository/users/administrator",
    verifyTokenAdmin,
    require("../Control/User/allAdm")
  );

  app.get(
    "/repository/users/students",
    verifyTokenAdminTeacher,
    require("../Control/User/allStudent")
  );

  app.get(
    "/repository/users/teachers",
    verifyTokenAdmin,
    require("../Control/User/allTeachers")
  );

  app.get("/repository/users/:_id", require("../Control/User/single"));

  /* ************** POST ************** */
  app.post(
    "/repository/users",
    verifyTokenAdmin,
    require("../Control/User/insert")
  );

  app.post("/repository/users/login", require("../Control/User/login"));

  app.post(
    "/repository/users/csv",
    verifyTokenAdmin,
    uploadsCsv.single("data"),
    require("../Control/User/insertUsers")
  );

  /* ************** PATCH ************** */

  app.patch(
    "/repository/users/:_id",
    verifyTokenAll,
    require("../Control/User/update")
  );

  app.patch(
    "/repository/users/image/:_id",
    verifyTokenAll,
    uploadsUserImages.single("image"),
    require("../Control/User/updateImage")
  );

  app.patch(
    "/repository/users/password/:_id",
    verifyTokenAll,
    require("../Control/User/updatePassword")
  );

  app.patch(
    "/repository/users/update/status",
    verifyTokenAdmin,
    require("../Control/User/updateStatus")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/users/:_id",
    verifyTokenAdmin,
    require("../Control/User/delete")
  );

  app.delete(
    "/repository/users",
    verifyTokenAdmin,
    require("../Control/User/deleteUsers")
  );

  /* ************** PUT ************** */

  app.put(
    "/repository/users/:_id",
    verifyTokenAdmin,
    require("../Control/User/updateAdmin")
  );

  /*
   * ---------------------------------------ROTAS COURSE-------------------------------------------------------
   */

  /* ************** GETS ************** */
  app.get("/repository/courses", require("../Control/Course/all"));

  app.get("/repository/courses/:_id", require("../Control/Course/single"));

  /* ************** POST ************** */
  app.post(
    "/repository/courses",
    verifyTokenAdmin,
    require("../Control/Course/insert")
  );

  /* ************** PUT ************** */
  app.put(
    "/repository/courses/:_id",
    verifyTokenAdminTeacher,
    require("../Control/Course/update")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/courses/:_id",
    verifyTokenAdmin,
    require("../Control/Course/delete")
  );

  app.delete(
    "/repository/courses",
    verifyTokenAdmin,
    require("../Control/Course/deleteCourses")
  );

  /*
   * ---------------------------------------ROTAS GROUP----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get(
    "/repository/groups",
    verifyTokenAdminTeacher,
    require("../Control/Group/all")
  );

  app.get(
    "/repository/groups/student/:_id",
    require("../Control/Group/SingleByStudent")
  );

  app.get("/repository/groups/:_id", require("../Control/Group/Single"));

  /* ************** POST ************** */
  app.post(
    "/repository/groups",
    verifyTokenAll,
    require("../Control/Group/insert")
  );

  /* ************** DELETE ************** */

  app.delete(
    "/repository/groups/:_id",
    verifyTokenAdminTeacher,
    require("../Control/Group/delete")
  );

  app.delete(
    "/repository/groups",
    verifyTokenAdminTeacher,
    require("../Control/Group/deleteGroups")
  );

  /* ************** PATCH ************** */
  app.patch(
    "/repository/groups/insertStudent",
    verifyTokenAll,
    require("../Control/Group/insertStudent")
  );

  app.patch(
    "/repository/groups/deleteStudent",
    verifyTokenAll,
    require("../Control/Group/deleteStudent")
  );

  app.patch("/repository/groups/accept", require("../Control/Group/accept"));

  app.patch(
    "/repository/groups/update/status",
    verifyTokenAdminTeacher,
    require("../Control/Group/updateStatus")
  );
  /* ************* PUT  ********** */
  app.put(
    "/repository/groups/:_id",
    verifyTokenAdminTeacher,
    require("../Control/Group/update")
  );
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
