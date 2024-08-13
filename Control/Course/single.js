const { ObjectId, BSON } = require("mongodb");
const Course = require("../../Schemas/Course");

module.exports = async (request, response) => {
  const _id = request.params._id;

  Course.findById(_id)
    .exec()
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Nenhum curso foi encontrado!",
        };
        return response.status(404).send(arr);
      }
      const arr = {
        status: "SUCCESS",
        message: "Curso recuperado com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      if (reject.name == "CastError") {
        const arr = {
          status: "ERROR",
          message: "Curso inválido!",
        };
        return response.status(400).send(arr);
      }
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao buscar o curso!",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
