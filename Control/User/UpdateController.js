/**
 * ATUALIZAR USUÁRIO
 *
 * Pode alterar nome, senha, número de telefone, github, linkedin e tipo de usuário.
 */

const ModelDatabase = require("../../Model/Database");
const ModelJwtToken = require("../../Model/JwtToken");
const ModelUser = require("../../Model/User");

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
  /*
    const database = new ModelDatabase();
    await database.conect();
    */
  const user = new ModelUser();
  user.id = id;

  const res = await user.exist();

  if (!res) {
    //database.desconnect();
    const arr = {
      status: "ERROR",
      message: "Usuário não existe",
    };
    return response.status(404).send(arr);
  }

  const name = request.body.name;
  const password = request.body.password;
  const phone_number = request.body.phone_number;
  const github = request.body.github;
  const linkedin = request.body.linkedin;
  const user_type = request.body.user_type;
  const email = request.body.email;

  user.name = name;
  user.password = password;
  user.phone_number = phone_number;
  user.github = github;
  user.linkedin = linkedin;
  user.user_type = user_type;
  user.email = email;

  user
    .update()
    .then((resolve) => {
      const arr = {
        status: "SUCESS",
        data: resolve,
        message: "Usuário atualizado com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        data: reject,
        message: "Erro ao atualizar usuário!",
      };
      return response.status(400).send(arr);
    });
  /*
        .finally(()=>{
            database.desconnect();
        })
        */
};
