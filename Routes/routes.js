module.exports = function (app) {
  const express = require("express");
  app.use(express.json());

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
    require("../Control/tcc/all")
  );

  app.get(
    "/repository/projects/professor/:_id",
    tokenAdminTeacher,
    require("../Control/tcc/allTeacher")
  );

  app.get("/repository/projects/public", require("../Control/tcc/allPublic"));

  app.get("/repository/projects/:_id", require("../Control/tcc/single"));

  app.get(
    "/repository/projects/student/:_id",
    require("../Control/tcc/singleByStudent")
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
    require("../Control/tcc/insert")
  );

  /* ************** PATCH ************** */

  app.patch(
    "/repository/projects/:_id",
    token,
    require("../Control/tcc/update")
  );

  app.patch(
    "/repository/projects/monography/:_id",
    token,
    uploadTemp.single("monography"),
    require("../Control/tcc/updateMonography")
  );

  app.patch(
    "/repository/projects/image/:_id",
    token,
    uploadTemp.single("image"),
    require("../Control/tcc/updateImage")
  );

  app.patch(
    "/repository/projects/document/:_id",
    token,
    uploadTemp.single("document"),
    require("../Control/tcc/updateDocument")
  );

  app.patch(
    "/repository/projects/zip/:_id",
    token,
    uploadTemp.single("zip"),
    require("../Control/tcc/updateZip")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/projects/:_id",
    tokenAdminTeacher,
    require("../Control/tcc/Delete")
  );

  app.delete(
    "/repository/projects",
    tokenAdminTeacher,
    require("../Control/tcc/deleteProjects")
  );

  /*****************PUT *********** */
  app.put(
    "/repository/projects/:_id",
    tokenAdminTeacher,
    require("../Control/tcc/updateAdm")
  );
  /*
   * ---------------------------------------ROTAS USERS----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get("/repository/users", token, require("../Control/user/all"));

  app.get(
    "/repository/users/administrator",
    tokenAdminTeacher,
    require("../Control/user/allAdm")
  );

  app.get(
    "/repository/users/students",
    tokenAdminTeacher,
    require("../Control/user/allStudent")
  );

  app.get(
    "/repository/users/teachers",
    tokenAdmin,
    require("../Control/user/allTeachers")
  );

  app.get("/repository/users/:_id", require("../Control/user/single"));

  /* ************** POST ************** */
  app.post("/repository/users", tokenAdmin, require("../Control/user/insert"));

  app.post("/repository/users/login", require("../Control/user/login"));

  app.post(
    "/repository/users/csv",
    tokenAdmin,
    uploadsCsv.single("data"),
    require("../Control/user/insertUsers")
  );

  /* ************** PATCH ************** */

  app.patch("/repository/users/:_id", token, require("../Control/user/update"));

  app.patch(
    "/repository/users/image/:_id",
    token,
    uploadsUserImages.single("image"),
    require("../Control/user/updateImage")
  );

  app.patch(
    "/repository/users/password/:_id",
    token,
    require("../Control/user/updatePassword")
  );

  app.patch(
    "/repository/users/status/:status",
    tokenAdmin,
    require("../Control/user/updateStatus")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/users/:_id",
    tokenAdmin,
    require("../Control/user/delete")
  );

  app.delete(
    "/repository/users",
    tokenAdmin,
    require("../Control/user/deleteUsers")
  );

  /* ************** PUT ************** */

  app.put(
    "/repository/users/:_id",
    tokenAdmin,
    require("../Control/user/updateAdmin")
  );

  /*
   * ---------------------------------------ROTAS COURSE-------------------------------------------------------
   */

  /* ************** GETS ************** */
  app.get("/repository/courses", require("../Control/course/all"));

  app.get("/repository/courses/:_id", require("../Control/course/single"));

  /* ************** POST ************** */
  app.post(
    "/repository/courses",
    tokenAdmin,
    require("../Control/course/insert")
  );

  /* ************** PUT ************** */
  app.put(
    "/repository/courses/:_id",
    tokenAdminTeacher,
    require("../Control/course/update")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/courses/:_id",
    tokenAdmin,
    require("../Control/course/delete")
  );

  app.delete(
    "/repository/courses",
    tokenAdmin,
    require("../Control/course/deleteCourses")
  );

  /*
   * ---------------------------------------ROTAS GROUP----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get(
    "/repository/groups",
    tokenAdminTeacher,
    require("../Control/group/all")
  );

  app.get(
    "/repository/groups/student/:_id",
    require("../Control/group/SingleByStudent")
  );

  app.get("/repository/groups/:_id", require("../Control/group/Single"));

  app.get(
    "/repository/groups/professor/:_id",
    require("../Control/group/allByTeacher")
  );

  /* ************** POST ************** */
  app.post("/repository/groups", token, require("../Control/group/insert"));

  app.post(
    "/repository/groups/administrator",
    tokenAdminTeacher,
    require("../Control/group/insertAdmin")
  );

  app.post(
    "/repository/groups/invite/:_id",
    require("../Control/group/inviteStudent")
  );
  /* ************** DELETE ************** */

  app.delete(
    "/repository/groups/:_id",
    tokenAdminTeacher,
    require("../Control/group/delete")
  );

  app.delete(
    "/repository/groups",
    tokenAdminTeacher,
    require("../Control/group/deleteGroups")
  );

  /* ************** PATCH ************** */
  app.patch(
    "/repository/groups/leave/:group_id",
    token,
    require("../Control/group/leaveGroup")
  );

  app.patch(
    "/repository/groups/insertStudent",
    token,
    require("../Control/group/insertStudent")
  );

  app.patch(
    "/repository/groups/deleteStudent",
    token,
    require("../Control/group/deleteStudent")
  );

  app.patch("/repository/groups/accept", require("../Control/group/accept"));

  app.patch(
    "/repository/groups/update/status",
    tokenAdminTeacher,
    require("../Control/group/updateStatus")
  );
  /* ************* PUT  ********** */
  app.put("/repository/groups/:_id", token, require("../Control/group/update"));
};
