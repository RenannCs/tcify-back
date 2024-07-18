const Tcc = require("../../Schemas/Tcc");
const User = require("../../Schemas/User");
const { ObjectId } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  //try {
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

  //Verificar token
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
  let tccsExcluidos = [];

  for (let _id of _id_list) {
    try {
      const resp = await Tcc.findByIdAndDelete(_id).exec();

      if (resp != null) {
        deletedCount += 1;
        tccsExcluidos.push(resp);
      }
    } catch {}
  }

  const data = {
    deletedCount: deletedCount,
    tccsExcluidos: tccsExcluidos,
  };

  const arr = {
    status: "SUCCESS",
    message: "TCC's excluídos!",
    data: data,
  };

  return response.status(200).send(arr);
  /*} catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }*/
};
