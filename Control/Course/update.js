const Course = require("../../Schemas/Course");
const User = require("../../Schemas/User");
const ModelJwtToken = require("../../Model/JwtToken");
const { ObjectId, BSON } = require("mongodb");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  let course;
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

  const _id = request.params._id;
  const name = request.body.name;
  const description = request.body.description;

  if ((await Course.exists({ _id: new ObjectId(_id) })) == null) {
    const arr = {
      status: "ERROR",
      message: "Curso não existe!",
    };
    return response.status(404).send(arr);
  }

  course = await Course.findById(_id);
  course.name = name;
  course.description = description;
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Curso inválido",
      };
      return response.status(400).send(arr);
    } else {
      const arr = {
        status: "ERROR",
        message: "Erro do servidor, tente novamente mais tarde!",
        data: error,
      };
      return response.status(500).send(arr);
    }
  }

  course
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Curso atualizado com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o curso!",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
