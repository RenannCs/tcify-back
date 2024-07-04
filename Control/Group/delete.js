const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
const { ObjectId } = require("mongodb");
const Group = require("../../Schemas/Group");
const Tcc = require("../../Schemas/TCC");
/**
 * DELETAR O TCC JUNTO
 */

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

  const id = request.params.id;

  if ((await Group.exists({ _id: new ObjectId(id) })) == null) {
    const arr = {
      status: "ERROR",
      message: "Grupo não existe!",
    };
    return response.status(404).send(arr);
  }

  Group.findByIdAndDelete(id)
    .exec()
    .then((resolve) => {
      return Tcc.findByIdAndDelete(resolve.tcc_id).exec();
    })
    .then((data) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo e TCC excluídos com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao excluir o grupo!",
      };
      return response.status(400).send(arr);
    });
  /*
    .exec()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo excluído com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao excluir o grupo",
        data: reject,
      };
      return response.status(400).send(arr);
    });*/
};
