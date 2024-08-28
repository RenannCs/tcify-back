const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  let query = {};
  const userLogged = request.userLogged;
  if (userLogged.user_type == "Professor") {
    query = { course_id: userLogged.course_id };
  }

  User.allFilter(query)
    .then((resolve) => {
      if (resolve.length == 0) {
        const arr = {
          status: "ERROR",
          message: "Nenhum usuário encontrado!",
        };
        return response.status(404).send(arr);
      }
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
