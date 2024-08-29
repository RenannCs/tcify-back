const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  const _id = request.params._id;

  Group.allFilter({ supervisor_id: _id })
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Nenhum grupo encontrado!",
          data: null,
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
      if (reject.name == "CastError") {
        const arr = {
          status: "ERROR",
          message: "Professor inválido!",
        };
        return response.status(400).send(arr);
      }
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os grupos!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
