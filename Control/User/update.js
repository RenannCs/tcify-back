/**
 * ATUALIZAR USUÁRIO
 *
 * Pode alterar  número de telefone, link, linkedin, email
 *
 *
 */

//const ModelDatabase = require("../../Model/Database");
const { ObjectId, BSON } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  const _id = request.params._id;
  const phone_number = request.body.phone_number;
  const link = request.body.link;
  const linkedin = request.body.linkedin;
  const email = request.body.email;

  let user;
  try {
  const authorizationHeader = request.headers.authorization;
  const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

  const token_id = tokenValidationResult.decoded.payload._id;
  const toke_user_type = tokenValidationResult.decoded.payload.user_type;
  const token_status = tokenValidationResult.status;

  if (
    token_status == false ||
    (await User.validateTokenId(token_id)) == false ||
    token_id != _id
  ) {
    const arr = {
      status: "ERROR",
      message: "Operação negada devido as permissões do usuário!",
    };
    return response.status(403).send(arr);
  }

  user = await User.findById(_id).exec();

  if (email != undefined) {
    const checkUser = await User.exists({ email: email }).exec();
    if (checkUser != null) {
      if (checkUser._id != _id) {
        const arr = {
          status: "ERROR",
          message: "Email já está em uso!",
        };
        return response.status(409).send(arr);
      }
    }

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
        data: error,
      };
      return response.status(500).send(arr);
    }
  }

  user
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        data: resolve,
        message: "Usuário atualizado com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        data: reject,
        message: "Ocorreu um erro ao atualizar o usuário!",
      };
      return response.status(500).send(arr);
    });
};
