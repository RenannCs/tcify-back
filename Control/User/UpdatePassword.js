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

  const fields = ["password"];

  const user = new ModelUser(id);

  const userData = await user.single(fields);


  if (userData.password !== password) {
    const arr = {
      status: "ERROR",
      message: "Senha incorreta!",
    };
    return response.status(401).send(arr);
  }

  if (userData.password == newPassword) {
    const arr = {
      status: "ERROR",
      message: "Senha já cadastrada!",
    };
    return response.status(401).send(arr);
  }

  user.password = newPassword;

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
  }
};
