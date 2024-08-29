const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  let query = {};

  const userLogged = request.userLogged;
  if (userLogged.user_type == "Professor") {
    query = { supervisor_id: userLogged._id };
  }

  Group.allFilter(query)
    .then((resolve) => {
      if (resolve.length == 0) {
        const arr = {
          status: "ERROR",
          message: "Nenhum grupo encontrado!",
        };
        return response.status(404).send(arr);
      }
      const arr = {
        status: "SUCCESS",
        message: "Grupos recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os grupos!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
