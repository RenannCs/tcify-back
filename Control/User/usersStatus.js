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

    //Verificar se o id do token existe
    if (
      (await User.exists({
        _id: new ObjectId(tokenValidationResult.decoded.payload._id),
      }).exec()) == null
    ) {
      const arr = {
        status: "ERROR",
        message: "Operação negada devido as condições do usuário!",
      };
      return response.status(403).send(arr);
    }

    //Verificar se o user é adm ou professor
    if (
      !["Administrador", "Professor"].includes(
        tokenValidationResult.decoded.payload.user_type
      )
    ) {
      const arr = {
        status: "ERROR",
        message: "Operação negada devido as permissões de usuário!",
      };
      return response.status(403).send(arr);
    }

    //Verificar o token
    if (tokenValidationResult.status !== true) {
      const arr = {
        status: "ERROR",
        message:
          "Invalid token! If the problem persists, please contact our technical support.",
        error: tokenValidationResult.error,
      };
      return response.status(401).send(arr);
    }

    let updatedCount = 0;
    let usuariosAtualizados = [];
    for (let _id of _id_list) {
      try {
        const resp = await User.findByIdAndUpdate(_id, { status: status });

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
