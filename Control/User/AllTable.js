const ModelJwtToken = require("../../Model/JwtToken");
const ModelUser = require("../../Model/User");
const ModelDatabase = require("../../Model/Database");

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
  /*
    const database = new ModelDatabase();
    await database.conect();
    */
  const user = new ModelUser();

  const fields = ["register", "name", "email", "phone_number", "user_type"];

  user
    .readAll(fields)
    .then((resolve) => {
      const arr = {
        data: resolve,
        status: "SUCESS",
        message: "Dados recuperados com sucesso!",
      };
      response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        dados: reject,
        status: "ERROR",
        message: "Erro ao excluir usuário!",
      };
      response.status(400).send(arr);
    });
  /*
        .finally(()=>{
            database.desconnect();
        })
        */
};
