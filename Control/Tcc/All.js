const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  let filter = {};
  const userLogged = request.userLogged;

  if (userLogged.user_type == "Professor") {
    filter = { supervisor_id: userLogged._id };
  }

  Tcc.allFilter(filter)
    .then((resolve) => {
      if (resolve.length == 0) {
        const arr = {
          status: "ERROR",
          message: "Nenhum projeto foi encontrado!",
        };
        return response.status(404).send(arr);
      }
      const arr = {
        status: "SUCCESS",
        message: "Projetos recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os projetos!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
