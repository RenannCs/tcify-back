const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  const _id = request.params._id;

  User.single(_id)
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Usuário não encontrado!",
        };
        return response.status(404).send(arr);
      }

      const arr = {
        status: "SUCCESS",
        message: "Usuário recuperado com sucesso",
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
