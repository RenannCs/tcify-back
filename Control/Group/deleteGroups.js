const { ObjectId, BSON } = require("mongodb");
const User = require("../../Schemas/User");
const Group = require("../../Schemas/Group");
const Tcc = require("../../Schemas/Tcc");

const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  try {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    const token_id = tokenValidationResult.decoded.payload._id;
    const token_user_type = tokenValidationResult.decoded.payload.user_type;
    const token_status = tokenValidationResult.status;

    if (token_status) {
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

    let deletedCount = 0;
    let gruposExcluidos = [];
    for (let _id of _id_list) {
      try {
        const resp = await Group.findByIdAndDelete(_id).exec();
        if (resp.tcc_id != null) {
          await Tcc.deleteOne({ _id: resp.tcc_id }).exec();
        }
        if (resp != null) {
          deletedCount += 1;
          gruposExcluidos.push(resp);
        }
      } catch {}
    }

    const data = {
      deletedCount: deletedCount,
      gruposExcluidos: gruposExcluidos,
    };
    const arr = {
      status: "SUCCES",
      message: "Grupos excluídos!",
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
