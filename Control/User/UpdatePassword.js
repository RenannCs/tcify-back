const ModelDatabase = require("../../Model/Database");
const ModelJwtToken = require("../../Model/JwtToken");
const ModelUser = require("../../Model/User");
const md5 = require("md5");

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

  const id = request.body.id;
  const password = md5(request.body.password);
  const newPassword = md5(request.body.newPassword);



  const user = new ModelUser(id);

  const userData = await user.single(id);

  if (!userData) {
    const arr = {
      status: "ERROR",
      message: "Usuário não encontrado!",
    };
    return response.status(404).send(arr);
  }

  if (userData.password !== password) {
    const arr = {
      status: "ERROR",
      message: "Senha incorreta!",
    };
    return response.status(401).send(arr);
  }

  user.password = newPassword;

  try {
    await user.update();
    const arr = {
      status: "SUCCESS",
      message: "Usuário atualizado com sucesso!",
    };
    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao atualizar o usuário!",
    };
    return response.status(500).send(arr);
  }
};
