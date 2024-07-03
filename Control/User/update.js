/**
 * ATUALIZAR USUÁRIO
 *
 * Pode alterar  número de telefone, link, linkedin, email
 *
 * Atualizar grupo tambem
 */

//const ModelDatabase = require("../../Model/Database");
const { ObjectId } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
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
  const phone_number = request.body.phone_number;
  const link = request.body.link;
  const linkedin = request.body.linkedin;
  const email = request.body.email;

  if ((await User.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Usuário não existe!",
    };
    return response.status(404).send(arr);
  }

  const user = await User.findById(id).exec();

  if (email != undefined) {
    user.email = email;
  }
  if (phone_number != undefined) {
    user.phone_number = phone_number;
  }
  if (link != undefined) {
    user.link = link;
  }
  if (linkedin != undefined) {
    user.linkedin = linkedin;
  }

  user
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCESS",
        data: resolve,
        message: "Usuario atualizado com sucesso",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        data: reject,
        message: "Ocorreu um erro ao atualizar o usuário!",
      };
      return response.status(200).send(arr);
    });

  /*
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
