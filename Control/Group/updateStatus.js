const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  let status;
  let _id_list;
  try {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    const token_status = tokenValidationResult.status;

    if (token_status) {
      const token_id = tokenValidationResult.decoded.payload._id;
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

    _id_list = request.body._id_list;
    status = request.body.status;

    let updatedCount = 0;
    let gruposAtualizados = [];
    for (let _id of _id_list) {
      try {
        
        const resp = await Group.findByIdAndUpdate(_id, {
          status: status,
        }).exec();

        if (resp != null) {
          updatedCount += 1;
          gruposAtualizados.push(resp);
        }
      } catch {}
    }

    const data = {
      updatedCount: updatedCount,
      gruposAtualizados: gruposAtualizados,
    };
    const arr = {
      status: "SUCCESS",
      message: "Grupos atualizados!",
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
