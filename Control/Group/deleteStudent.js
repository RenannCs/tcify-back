const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Tcc = require("../../Schemas/Tcc");

const Email = require("../../Model/Email");

const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let _id;
  let register;
  try {
  const authorizationHeader = request.headers.authorization;
  const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

  const token_id = tokenValidationResult.decoded.payload._id;
  const token_user_type = tokenValidationResult.decoded.payload.user_type;
  const token_status = tokenValidationResult.status;

  if (token_status) {
    if ((await User.validateTokenId(token_id)) == false) {
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

  _id = request.body._id;
  register = request.body.register;

  if ((await Group.exists({ _id: new ObjectId(_id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Grupo não existe!",
    };
    return response.status(404).send(arr);
  }

  if ((await User.exists({ register: register }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Usuário não existe!",
    };
    return response.status(404).send(arr);
  }

  const student = await User.findOne({ register: register }).exec();
  const group = await Group.findById(_id).exec();

  if (group.students.length == 1 || group.leader_id == student.id) {
    try {
      if (group.tcc_id != null) {
        await Tcc.deleteOne({ _id: group.tcc_id }).exec();
      }

      await Group.deleteOne({ _id: group.id }).exec();
      const arr = {
        status: "SUCCESS",
        message: "Grupo e TCC excluídos!",
      };
      return response.status(200).send(arr);
    } catch {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao excluir o grupo!",
      };
      return response.status(400).send(arr);
    }
  }

  if (!group.students.includes(student.id)) {
    const arr = {
      status: "ERROR",
      message: "Aluno não está nesse grupo!",
    };
    return response.status(400).send(arr);
  }
  let newStudents = [];
  let ver = false;
  for (let _student of group.students) {
    if (_student != student.id) {
      newStudents.push(_student);
    } else {
      ver = true;
    }
  }

  group.students = newStudents;

  await group.save();

  const arr = {
    status: "SUCCESS",
    message: "Aluno excluído com sucesso!",
  };
  return response.status(200).send(arr);
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Grupo inválido!",
      };
      return response.status(400).send(arr);
    }
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
/*
  const email = new Email();
  email.dest = student.email;
  email.subject = "Você foi removido do grupo";
  email.title = "Você foi removido do seu grupo!";
  email.message = `
        <p> ${student.name}, você foi removido do seu grupo do Repositório de TCC's da Univap Centro!</p>`;

  email.send();
  */
