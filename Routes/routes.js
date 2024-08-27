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
        user: {
          _id: request.userLogged._id,
          name: request.userLogged.name,
          register: request.userLogged.register,
          user_type: request.userLogged.user_type,
          image: request.userLogged.image,
          group_id: request.userLogged.group_id,
          project_id: request.userLogged.tcc_id,
        },
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
    require("../Control/Tcc/all")
  );

  app.get(
    "/repository/projects/professor/:_id",
    tokenAdminTeacher,
    require("../Control/Tcc/allTeacher")
  );

  app.get("/repository/projects/public", require("../Control/Tcc/allPublic"));

  app.get("/repository/projects/:_id", require("../Control/Tcc/single"));

  app.get(
    "/repository/projects/student/:_id",
    require("../Control/Tcc/singleByStudent")
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
    require("../Control/Tcc/insert")
  );

  /* ************** PATCH ************** */

  app.patch(
    "/repository/projects/:_id",
    token,
    require("../Control/Tcc/update")
  );

  app.patch(
    "/repository/projects/monography/:_id",
    token,
    uploadTemp.single("monography"),
    require("../Control/Tcc/updateMonography")
  );

  app.patch(
    "/repository/projects/image/:_id",
    token,
    uploadTemp.single("image"),
    require("../Control/Tcc/updateImage")
  );

  app.patch(
    "/repository/projects/document/:_id",
    token,
    uploadTemp.single("document"),
    require("../Control/Tcc/updateDocument")
  );

  app.patch(
    "/repository/projects/zip/:_id",
    token,
    uploadTemp.single("zip"),
    require("../Control/Tcc/updateZip")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/projects/:_id",
    tokenAdminTeacher,
    require("../Control/Tcc/Delete")
  );

  app.delete(
    "/repository/projects",
    tokenAdminTeacher,
    require("../Control/Tcc/deleteProjects")
  );

  /*****************PUT *********** */
  app.put(
    "/repository/projects/:_id",
    tokenAdminTeacher,
    require("../Control/Tcc/updateAdm")
  );
  /*
   * ---------------------------------------ROTAS USERS----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get("/repository/users", tokenAdmin, require("../Control/User/all"));

  app.get(
    "/repository/users/administrator",
    tokenAdmin,
    require("../Control/User/allAdm")
  );

  app.get(
    "/repository/users/students",
    tokenAdminTeacher,
    require("../Control/User/allStudent")
  );

  app.get(
    "/repository/users/teachers",
    tokenAdmin,
    require("../Control/User/allTeachers")
  );

  app.get("/repository/users/:_id", require("../Control/User/single"));

  /* ************** POST ************** */
  app.post("/repository/users", tokenAdmin, require("../Control/User/insert"));

  app.post("/repository/users/login", require("../Control/User/login"));

  app.post(
    "/repository/users/csv",
    tokenAdmin,
    uploadsCsv.single("data"),
    require("../Control/User/insertUsers")
  );

  /* ************** PATCH ************** */

  app.patch("/repository/users/:_id", token, require("../Control/User/update"));

  app.patch(
    "/repository/users/image/:_id",
    token,
    uploadsUserImages.single("image"),
    require("../Control/User/updateImage")
  );

  app.patch(
    "/repository/users/password/:_id",
    token,
    require("../Control/User/updatePassword")
  );

  app.patch(
    "/repository/users/status/:status",
    tokenAdmin,
    require("../Control/User/updateStatus")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/users/:_id",
    tokenAdmin,
    require("../Control/User/delete")
  );

  app.delete(
    "/repository/users",
    tokenAdmin,
    require("../Control/User/deleteUsers")
  );

  /* ************** PUT ************** */

  app.put(
    "/repository/users/:_id",
    tokenAdmin,
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
    tokenAdmin,
    require("../Control/Course/insert")
  );

  /* ************** PUT ************** */
  app.put(
    "/repository/courses/:_id",
    tokenAdminTeacher,
    require("../Control/Course/update")
  );

  /* ************** DELETE ************** */
  app.delete(
    "/repository/courses/:_id",
    tokenAdmin,
    require("../Control/Course/delete")
  );

  app.delete(
    "/repository/courses",
    tokenAdmin,
    require("../Control/Course/deleteCourses")
  );

  /*
   * ---------------------------------------ROTAS GROUP----------------------------------------------------------
   */

  /* ************** GETS ************** */

  app.get(
    "/repository/groups",
    tokenAdminTeacher,
    require("../Control/Group/all")
  );

  app.get(
    "/repository/groups/student/:_id",
    require("../Control/Group/SingleByStudent")
  );

  app.get("/repository/groups/:_id", require("../Control/Group/Single"));

  app.get(
    "/repository/groups/professor/:_id",
    require("../Control/Group/allByTeacher")
  );

  /* ************** POST ************** */
  app.post("/repository/groups", token, require("../Control/Group/insert"));

  app.post(
    "/repository/groups/administrator",
    tokenAdminTeacher,
    require("../Control/Group/insertAdmin")
  );

  /* ************** DELETE ************** */

  app.delete(
    "/repository/groups/:_id",
    tokenAdminTeacher,
    require("../Control/Group/delete")
  );

  app.delete(
    "/repository/groups",
    tokenAdminTeacher,
    require("../Control/Group/deleteGroups")
  );

  /* ************** PATCH ************** */
  app.patch(
    "/repository/groups/insertStudent",
    token,
    require("../Control/Group/insertStudent")
  );

  app.patch(
    "/repository/groups/deleteStudent",
    token,
    require("../Control/Group/deleteStudent")
  );

  app.patch("/repository/groups/accept", require("../Control/Group/accept"));

  app.patch(
    "/repository/groups/update/status",
    tokenAdminTeacher,
    require("../Control/Group/updateStatus")
  );
  /* ************* PUT  ********** */
  app.put(
    "/repository/groups/:_id",
    tokenAdminTeacher,
    require("../Control/Group/update")
  );
};
