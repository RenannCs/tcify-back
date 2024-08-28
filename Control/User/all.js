const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  let filter = {};
  const userLogged = request.userLogged;
  if (userLogged.user_type == "Professor") {
    filter = { course_id: userLogged.course_id };
  }
  
  User.allFilter(filter)
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Dados recuperados com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Erro de servidor, tente novamente mais tarde!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
