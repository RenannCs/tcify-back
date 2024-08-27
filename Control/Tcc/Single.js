const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  const _id = request.params._id

  Tcc.single(_id)
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Nenhum TCC encontrado!",
        };
        return response.status(404).send(arr);
      }
      const arr = {
        status: "SUCCESS",
        message: "Projeto recuperado com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Erro de servidor, tente novamente mais tarde!",
        error: reject
      };
      return response.status(500).send(arr);
    });
};
