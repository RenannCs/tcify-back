const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  Tcc.allFilter({ status: "1" })
    .then((resolve) => {
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
