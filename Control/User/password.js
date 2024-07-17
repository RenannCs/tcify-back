const { ObjectId, BSON } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
const JwtToken = new ModelJwtToken();
const md5 = require("md5");
module.exports = async (request, response) => {
  const _id = request.body._id;
  const password = request.body.password;
  const newPassword = request.body.newPassword;

  let user;

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

    if ((await User.exists({ _id: new ObjectId(_id) })) == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não existe!",
      };
      return response.status(404).send(arr);
    }

    user = await User.findById(_id);

    if (user.password != md5(password)) {
      const arr = {
        status: "ERROR",
        message: "Senha incorreta!",
      };
      return response.status(401).send(arr);
    }

    if (user.password == md5(newPassword)) {
      const arr = {
        status: "ERROR",
        message: "Senha já cadastrada!",
      };
      return response.status(401).send(arr);
    }

    user.password = newPassword;
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Id inválido!",
      };
      return response.status(400).send(arr);
    } else {
      const arr = {
        status: "ERROR",
        message: "Erro do servidor, tente novamente mais tarde!",
        data: err,
      };
      return response.status(500).send(arr);
    }
  }

  user
    .save()
    .then(() => {
      const arr = {
        status: "SUCCESS",
        message: "Senha atualizada com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch(() => {
      const arr = {
        status: "ERROR",
        message: "Erro ao atualizar o senha!",
      };
      return response.status(500).send(arr);
    });
};
