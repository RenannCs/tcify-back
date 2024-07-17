const Course = require("../../Schemas/Course");
const ModelJwtToken = require("../../Model/JwtToken");
const { ObjectId } = require("mongodb");

const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  const authorizationHeader = request.headers.authorization;
  const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

  if (tokenValidationResult.status !== true) {
    const arr = {
      status: "ERROR",
      message:
        "Invalid token! If the problem persists, please contact our technical support.",
      error: tokenValidationResult.error,
    };
    return response.status(401).send(arr);
  }

  const id = request.params.id;

  if ((await Course.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Curso não existe",
    };
    return response.status(404).send(arr);
  }
  Course.findByIdAndDelete(id)
    .exec()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Curso excluído com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao excluir o curso!",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
