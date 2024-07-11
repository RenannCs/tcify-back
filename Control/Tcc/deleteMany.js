const { ObjectId } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const Tcc = require("../../Schemas/Tcc");

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

  const arrayId = request.body.ids;

  let deletedCount = 0;
  let usuariosExcluidos = [];
  for (let id of arrayId) {
    try {
      const resp = await Tcc.deleteOne({ _id: id }).exec();

      if (resp.deletedCount == 1) {
        deletedCount += 1;
        usuariosExcluidos.push(id);
      }
    } catch {}
  }

  const data = {
    deletedCount: deletedCount,
    usuariosExcluidos: usuariosExcluidos,
  };
  const arr = {
    status: "SUCCES",
    message: "TCC's excluídos!",
    data: data,
  };

  return response.status(200).send(arr);
};
