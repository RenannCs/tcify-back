const { ObjectId, BSON } = require("mongodb");

const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  const status = request.body.status;
  const _id_list = request.body._id_list;

  try {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    const token_id = tokenValidationResult.decoded.payload._id;
    const token_user_type = tokenValidationResult.decoded.payload.user_type;
    const token_status = tokenValidationResult.status;

    if (
      token_status == false ||
      (await User.validateTokenId(token_id)) == false ||
      User.validatePermission(token_user_type) == false
    ) {
      const arr = {
        status: "ERROR",
        message: "Operação negada devido as permissões do usuário!",
      };
      return response.status(403).send(arr);
    }

    let updatedCount = 0;
    let usuariosAtualizados = [];
    for (let _id of _id_list) {
      try {
        const resp = await User.findByIdAndUpdate(_id, { status: status });
        resp.status = status;
        if (resp != null) {
          updatedCount += 1;
          usuariosAtualizados.push(resp);
        }
      } catch {}
    }

    const data = {
      updatedCount: updatedCount,
      usuariosAtualizados: usuariosAtualizados,
    };
    const arr = {
      status: "SUCCESS",
      message: "Usuários atualizados!",
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
