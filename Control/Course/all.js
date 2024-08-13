const Course = require("../../Schemas/Course");

module.exports = async (request, response) => {
  Course.find()
    .exec()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Cursos retornados com sucesso!",
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
