const Course = require("../../Schemas/Course");
const User = require("../../Schemas/User");
const { ObjectId } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
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

    const _id_list = request.body._id_list;

    let deletedCount = 0;
    let cursosExcluidos = [];
    for (let _id of _id_list) {
      try {
        let resp = await Course.findByIdAndDelete(_id).exec();

        if (resp != null) {
          deletedCount += 1;
          cursosExcluidos.push(resp);
        }
      } catch {}
    }

    const data = {
      deletedCount: deletedCount,
      cursosExcluidos: cursosExcluidos,
    };
    const arr = {
      status: "SUCCESS",
      message: "Cursos excluídos!",
      data: data,
    };
    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
