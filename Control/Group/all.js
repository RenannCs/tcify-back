const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  try {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    const token_status = tokenValidationResult.status;

    if (token_status) {
      const token_id = tokenValidationResult.decoded.payload._id;
      const token_user_type = tokenValidationResult.decoded.payload.user_type;
      
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
  } catch (error) {
    /*if (error instanceof TypeError) {
      const arr = {
        status: "ERROR",
        message: "Token de validação inválido!",
        data: error.message,
      };
      return response.status(403).send(arr);
    }*/
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  Group.all()
    .then((data) => {
      return (format = data.map((group) => ({
        _id: group._id,

        title: group.title ? group.title : null,

        students: group.students,

        course_id: group.course_id ? group.course_id._id : null,
        course_name: group.course_id ? group.course_id.name : null,

        supervisor: group.supervisor ? group.supervisor.name : null,
        supervisor_id: group.supervisor ? group.supervisor._id : null,

        tcc: group.tcc_id ? group.tcc_id : null,

        leader: group.leader_id ? group.leader_id.name : null,
        leader_id: group.leader_id ? group.leader_id._id : null,

        status: group.status ? group.status : null,
      })));
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupos recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os grupos!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
