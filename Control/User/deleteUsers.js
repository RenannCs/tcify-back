const { ObjectId } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
const fs = require("fs");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  try {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    const token_status = tokenValidationResult.status;
    let token_id;
    if (token_status) {
      token_id = tokenValidationResult.decoded.payload._id;
      const token_user_type = tokenValidationResult.decoded.payload.user_type;

      if (
        (await User.validateTokenId(token_id)) == false ||
        User.validatePermission(token_user_type) == false
      ) {
        const arr = {
          status: "ERROR",
          message: "Operação negada devido as permissões do usuário!",
        };
        return response.status(403).send(arr);
      }
    } else {
      const arr = {
        status: "ERROR",
        message: "Token de validação inválido!",
      };
      return response.status(403).send(arr);
    }

    const _id_list = request.body._id_list;

    //Verificar se o id do token esta na lista de usuarios
    if (_id_list.includes(token_id)) {
      const arr = {
        status: "ERROR",
        message: "Você não pode excluir a si mesmo!",
      };
      return response.status(403).send(arr);
    }

    let deletedCount = 0;
    let usuariosExcluidos = [];
    for (let _id of _id_list) {
      try {
        const resp = await User.findByIdAndDelete(_id).exec();

        if (resp.image != null) {
          if (fs.existsSync(resp.image)) {
            fs.unlink(resp.image, () => {});
          }
        }

        if (resp != null) {
          deletedCount += 1;
          usuariosExcluidos.push(resp);
        }
      } catch {}
    }

    const data = {
      deletedCount: deletedCount,
      usuariosExcluidos: usuariosExcluidos,
    };
    const arr = {
      status: "SUCCESS",
      message: "Usuários excluídos!",
      data: data,
    };

    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
