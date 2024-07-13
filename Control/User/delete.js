const { ObjectId, BSON } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");

const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  const _id = request.params._id;

  try {
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

    if ((await User.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não existe!",
      };
      return response.status(404).send(arr);
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Id inválido!",
      };
      return response.status(400).send(arr);
    }
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  User.findByIdAndDelete(_id)
    .exec()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Usuário excluído com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao tentar excluir o usuário!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
