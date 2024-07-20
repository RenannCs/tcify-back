const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Tcc = require("../../Schemas/Tcc");
const Course = require("../../Schemas/Course");

const { ObjectId } = require("mongodb");
module.exports = async (request, response) => {
  let group;

  let _id;
  let title;
  let course_id;
  let supervisor;
  let tcc_id;
  let status;
  try {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    const token_id = tokenValidationResult.decoded.payload._id;
    const token_user_type = tokenValidationResult.decoded.payload.user_type;
    const token_status = tokenValidationResult.status;

    if (token_status) {
      if (
        (await User.validateTokenId(token_id)) == false ||
        User.validatePermission(token_user_type) == false
      ) {
        const arr = {
          status: "ERROR",
          message: "Operação negada devido as permissões do usuário!",
        };
        return response.status(403).send(arr);
      }
    } else {
      const arr = {
        status: "ERROR",
        message: "Token de validação inválido!",
      };
      return response.status(403).send(arr);
    }

    _id = request.params._id;

    if ((await Group.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não existe!",
      };
      return response.status(404).send(arr);
    }

    group = await Group.findById(_id).exec();

    title = request.body.title;
    course_id = request.body.course_id;
    supervisor = request.body.supervisor;
    tcc_id = request.body.tcc_id;
    status = request.body.status;

    if (title != undefined) {
      group.title = title;
    }

    if (status != undefined) {
      group.status = status;
    }

    if (course_id != undefined) {
      if ((await Course.exists({ _id: course_id }).exec()) == null) {
        const arr = {
          status: "ERROR",
          message: "Curso não existe!",
        };
        return response.status(404).send(arr);
      }
      group.course_id = course_id;
    }
    if (supervisor != undefined) {
      if (
        (await User.exists({
          $and: [{ _id: supervisor }, { user_type: "Professor" }],
        }).exec()) == null
      ) {
        const arr = {
          status: "ERROR",
          message: "Supervisor não existe!",
        };
        return response.status(404).send(arr);
      }
      group.supervisor = supervisor;
    }

    if (tcc_id != undefined) {
      if ((await Tcc.exists({ _id: tcc_id }).exec()) == null) {
        const arr = {
          status: "ERROR",
          message: "Tcc não existe!",
        };
        return response.status(404).send(arr);
      }
      group.tcc_id = tcc_id;
    }
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

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
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o grupo!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
