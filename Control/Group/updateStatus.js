const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

const Group = require("../../Schemas/Group");
const { ObjectId } = require("mongodb");
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

  const id = request.body.id;
  const status = request.body.status;

  if ((await Group.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "TCC não existe!",
    };
    return response.status(404).send(arr);
  }

  const group = await Group.findById(id).exec();

  group.status = status;

  group
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo atualizado com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch(() => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o grupo!",
      };
      return response.status(400).send(arr);
    });
};
