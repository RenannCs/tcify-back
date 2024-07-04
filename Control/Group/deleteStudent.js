const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Tcc = require("../../Schemas/TCC");
const Email = require("../../Model/Email");

const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
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
  const register = request.body.register;

  if ((await Group.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Grupo não encontrado!",
    };
    return response.staus(404).send(arr);
  }

  if ((await User.exists({ register: register }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Usuário não encontrado!",
    };
    return response.status(404).send(arr);
  }

  const student = await User.findOne({ register: register }).exec();
  const group = await Group.findById(id).exec();

  if (group.students.length == 1 || group.leader_id == student.id) {
    try {
      await Tcc.deleteOne({ _id: group.tcc_id }).exec();
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

  let newStudents = [];
  for (let _student of group.students) {
    if (_student != student.id) {
      newStudents.push(_student);
    }
  }
  group.students = newStudents;

  const email = new Email();
  email.dest = student.email;
  email.subject = "Você foi removido do grupo";
  email.title = "Você foi removido do seu grupo!";
  email.message = `
        <p> ${student.name}, você foi removido do seu grupo do Repositório de TCC's da Univap Centro!</p>`;

  email.send();

  group
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Aluno excluído com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao exlcuir o aluno!",
      };
      return response.status(400).send(arr);
    });
};
