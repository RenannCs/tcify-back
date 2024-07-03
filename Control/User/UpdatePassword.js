const { ObjectId } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
const JwtToken = new ModelJwtToken();
const md5 = require("md5");
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

  const id = request.body.id;
  const password = request.body.password;
  const newPassword = request.body.newPassword;

  if ((await User.exists({ _id: new ObjectId(id) })) == null) {
    const arr = {
      status: "ERROR",
      message: "Usuário não existe!",
    };
    return response.status(404).send(arr);
  }

  const user = await User.findById(id);

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
  /*
  try {
    await user.update();
    const arr = {
      status: "SUCCESS",
      message: "Senha atualizada com sucesso!",
    };
    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro ao atualizar o senha!",
    };
    return response.status(500).send(arr);
  }*/
};
