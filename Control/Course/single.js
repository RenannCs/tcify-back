const { ObjectId, BSON } = require("mongodb");
const Course = require("../../Schemas/Course");

module.exports = async (request, response) => {
  const _id = request.params._id;
  try {
    if ((await Course.exists({ _id: new ObjectId(_id) })) == null) {
      const arr = {
        status: "ERROR",
        message: "Curso não existe!",
      };
      return response.status(404).send(arr);
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Curso inválido",
      };
      return response.status(400).send(arr);
    } else {
      const arr = {
        status: "ERROR",
        message: "Erro do servidor, tente novamente mais tarde!",
        data: error,
      };
      return response.status(500).send(arr);
    }
  }

  Course.findById(_id)
    .exec()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Curso recuperado com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Oorreu um erro ao buscar o curso!",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
