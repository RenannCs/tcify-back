const { ObjectId } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
const fs = require("fs");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  try {
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

    const _id_list = request.body._id_list;

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
