const Course = require("../../Schemas/Course");

module.exports = async (request, response) => {
  Course.find()
    .exec()
    .then((resolve) => {
      const arr = {
        status: "SUCESS",
        message: "Cursos retornados com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao buscar os cursos",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
