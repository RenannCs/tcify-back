module.exports = function (app) {
  const express = require("express");
  app.use(express.json());

  const path = require('path');


  /**
   * Criação de pastas: temporária, documentos, monografias, documentos, imagens, zips
   */
  const multer = require("multer");
  const uploadTemp = multer({ dest: "Temp" });
  const uploadsCsv = multer({ dest: "Uploads/CSV" });
  const uploadmMonography = multer({ dest: "Uploads/Monographys" });
  const uploadDocuments = multer({ dest: "Uploads/Documents" });
  const uploadZip = multer({ dest: "Uploads/Zips" });
  const uploadTccsImages = multer({ dest: "Uploads/TccsImages" });
  const uploadsUserImages = multer({
    dest: "Uploads/UsersImages",
  });

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  /**
   * imports de Middlewares
   */
  const token = require("../Middlewares/token");
  const tokenAdmin = require("../Middlewares/tokenAdmin");
  const tokenAdminTeacher = require("../Middlewares/tokenAdminTeacher");

  /* ************** Autenticação de Token ********************* */

  app.post("/repository/users/auth", token, (request, response) => {
    const arr = {
      status: "SUCCESS",
      message: "Token validado com sucesso!",
      data: {
        user: request.userLogged,
      },
    };
    return response.status(200).send(arr);
  });
  /*
   * ---------------------------------------ROTAS TCC----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get(
    "/repository/projects",
    tokenAdminTeacher,
    require(path.join(__dirname, '../control/tcc/all'))
  );

  app.get(
    "/repository/projects/professor/:_id",
    tokenAdminTeacher,
    require("../control/tcc/allTeacher")
  );

  app.get("/repository/projects/public", require("../control/tcc/allPublic"));

  app.get("/repository/projects/:_id", require("../control/tcc/single"));

  app.get(
    "/repository/projects/student/:_id",
    require("../control/tcc/singleByStudent")
  );

  /* ************** POST ************** */

  app.post(
    "/repository/projects",
    token,
    uploadTemp.fields([
      { name: "document", maxCount: 1 },
      { name: "monography", maxCount: 1 },
      { name: "zip", maxCount: 1 },
      { name: "image", maxCount: 1 },
    ]),
    require("../control/tcc/insert")
  );

  /* ************** PATCH ************** */

  app.patch(
    "/repository/projects/:_id",
    token,
    require("../control/tcc/update")
  );

  app.patch(
    "/repository/projects/monography/:_id",
    token,
    uploadTemp.single("monography"),
    require("../control/tcc/updateMonography")
  );

  app.patch(
    "/repository/projects/image/:_id",
    token,
    uploadTemp.single("image"),
    require("../control/tcc/updateImage")
  );

  app.patch(
    "/repository/projects/document/:_id",
    token,
    uploadTemp.single("document"),
    require("../control/tcc/updateDocument")
  );

  app.patch(
    "/repository/projects/zip/:_id",
    token,
    uploadTemp.single("zip"),
    require("../control/tcc/updateZip")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/projects/:_id",
    tokenAdminTeacher,
    require("../control/tcc/Delete")
  );

  app.delete(
    "/repository/projects",
    tokenAdminTeacher,
    require("../control/tcc/deleteProjects")
  );

  /*****************PUT *********** */
  app.put(
    "/repository/projects/:_id",
    tokenAdminTeacher,
    require("../control/tcc/updateAdm")
  );
  /*
   * ---------------------------------------ROTAS USERS----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get("/repository/users", token, require("../control/user/all"));

  app.get(
    "/repository/users/administrator",
    tokenAdminTeacher,
    require("../control/user/allAdm")
  );

  app.get(
    "/repository/users/students",
    tokenAdminTeacher,
    require("../control/user/allStudent")
  );

  app.get(
    "/repository/users/teachers",
    tokenAdmin,
    require("../control/user/allTeachers")
  );

  app.get("/repository/users/:_id", require("../control/user/single"));

  /* ************** POST ************** */
  app.post("/repository/users", tokenAdmin, require("../control/user/insert"));

  app.post("/repository/users/login", require("../control/user/login"));

  app.post(
    "/repository/users/csv",
    tokenAdmin,
    uploadsCsv.single("data"),
    require("../control/user/insertUsers")
  );

  /* ************** PATCH ************** */

  app.patch("/repository/users/:_id", token, require("../control/user/update"));

  app.patch(
    "/repository/users/image/:_id",
    token,
    uploadsUserImages.single("image"),
    require("../control/user/updateImage")
  );

  app.patch(
    "/repository/users/password/:_id",
    token,
    require("../control/user/updatePassword")
  );

  app.patch(
    "/repository/users/status/:status",
    tokenAdmin,
    require("../control/user/updateStatus")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/users/:_id",
    tokenAdmin,
    require("../control/user/delete")
  );

  app.delete(
    "/repository/users",
    tokenAdmin,
    require("../control/user/deleteUsers")
  );

  /* ************** PUT ************** */

  app.put(
    "/repository/users/:_id",
    tokenAdmin,
    require("../control/user/updateAdmin")
  );

  /*
   * ---------------------------------------ROTAS COURSE-------------------------------------------------------
   */

  /* ************** GETS ************** */
  app.get("/repository/courses", require("../control/course/all"));

  app.get("/repository/courses/:_id", require("../control/course/single"));

  /* ************** POST ************** */
  app.post(
    "/repository/courses",
    tokenAdmin,
    require("../control/course/insert")
  );

  /* ************** PUT ************** */
  app.put(
    "/repository/courses/:_id",
    tokenAdminTeacher,
    require("../control/course/update")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/courses/:_id",
    tokenAdmin,
    require("../control/course/delete")
  );

  app.delete(
    "/repository/courses",
    tokenAdmin,
    require("../control/course/deleteCourses")
  );

  /*
   * ---------------------------------------ROTAS GROUP----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get(
    "/repository/groups",
    tokenAdminTeacher,
    require("../control/group/all")
  );

  app.get(
    "/repository/groups/student/:_id",
    require("../control/group/SingleByStudent")
  );

  app.get("/repository/groups/:_id", require("../control/group/Single"));

  app.get(
    "/repository/groups/professor/:_id",
    require("../control/group/allByTeacher")
  );

  /* ************** POST ************** */
  app.post("/repository/groups", token, require("../control/group/insert"));

  app.post(
    "/repository/groups/administrator",
    tokenAdminTeacher,
    require("../control/group/insertAdmin")
  );

  app.post(
    "/repository/groups/invite/:_id",
    require("../control/group/inviteStudent")
  );
  /* ************** DELETE ************** */

  app.delete(
    "/repository/groups/:_id",
    tokenAdminTeacher,
    require("../control/group/delete")
  );

  app.delete(
    "/repository/groups",
    tokenAdminTeacher,
    require("../control/group/deleteGroups")
  );

  /* ************** PATCH ************** */
  app.patch(
    "/repository/groups/leave/:group_id",
    token,
    require("../control/group/leaveGroup")
  );

  app.patch(
    "/repository/groups/insertStudent",
    token,
    require("../control/group/insertStudent")
  );

  app.patch(
    "/repository/groups/deleteStudent",
    token,
    require("../control/group/deleteStudent")
  );

  app.patch("/repository/groups/accept", require("../control/group/accept"));

  app.patch(
    "/repository/groups/update/status",
    tokenAdminTeacher,
    require("../control/group/updateStatus")
  );
  /* ************* PUT  ********** */
  app.put("/repository/groups/:_id", token, require("../control/group/update"));
};
