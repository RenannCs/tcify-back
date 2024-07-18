const { ObjectId, BSON } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
const Course = require("../../Schemas/Course");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  const _id = request.params._id;

  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;
  const phone_number = request.body.phone_number;
  const link = request.body.link;
  const user_type = request.body.user_type;
  const status = request.body.status;
  const course_id = request.body.course_id;

  let user;

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

    if ((await User.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não existe!",
      };
      return response.status(404).send(arr);
    }

    user = await User.findById(_id).exec();

    if (name != undefined) {
      user.name = name;
    }
    if (email != undefined) {
      const checkUser = await User.exists({ email: email }).exec();
      if (checkUser != null) {
        if (checkUser._id != _id) {
          const arr = {
            status: "ERROR",
            message: "Email já está em uso!",
          };
          return response.status(409).send(arr);
        }
      }
      user.email = email;
    }
    if (password != undefined) {
      user.password = password;
    }
    if (phone_number != undefined) {
      user.phone_number = phone_number;
    }
    if (link != undefined) {
      user.link = link;
    }
    if (user_type != undefined) {
      user.user_type = user_type;
    }
    if (status != undefined) {
      user.status = status;
    }
    if (course_id != undefined) {
      if (
        (await Course.exists({ _id: new ObjectId(course_id) }).exec()) == null
      ) {
        const arr = {
          status: "ERROR",
          message: "Curso não existe!",
        };
        return response.status(404).send(arr);
      }
      user.course_id = course_id;
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Id inválido!",
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

  user
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        data: resolve,
        message: "Usuário atualizado com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        data: reject,
        message: "Ocorreu um erro ao atualizar o usuário!",
      };
      return response.status(500).send(arr);
    });
};
