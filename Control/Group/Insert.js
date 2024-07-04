const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Email = require("../../Model/Email");
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

  const arrayStudentsRegister = request.body.students;
  const leader_register = request.body.leader_register;
  const supervisor = request.body.supervisor;

  if ((await User.exists({ register: leader_register }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Matrícula " + leader_register + " não existe!",
    };
    return response.status(404).send(arr);
  }

  const leaderData = await User.findOne({ register: leader_register }).exec();

  if ((await Group.existsByStudent(leaderData.id)) != null) {
    const arr = {
      status: "ERROR",
      message: "Você já possuí grupo!",
    };
    return response.status(400).send(arr);
  }

  for (const _student of arrayStudentsRegister) {
    if ((await User.exists({ register: _student }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Matrícula " + _student + " não existe!",
      };
      return response.status(404).send(arr);
    }
    const student = await User.findOne({ register: _student }).exec();
    if ((await Group.existsByStudent(student.id)) != null) {
      const arr = {
        status: "ERROR",
        message: "Aluno " + student.register + " já adicionado a um grupo",
      };
      return response.status(400).send(arr);
    }
  }

  const group = new Group();
  group.students = [leaderData.id];
  group.leader_id = leaderData.id;
  group.course_id = leaderData.course_id;
  group.supervisor = supervisor;
  group.status = "0";

  let novoGrupo;
  try {
    novoGrupo = await group.save();
  } catch {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao inserir o grupo",
    };
    return response.status(400).send(arr);
  }

  for (const _student of arrayStudentsRegister) {
    const student = await User.findOne({ register: _student });

    if (_student != leader_register) {
      const email = new Email();
      email.dest = student.email;
      email.subject = "Convite para grupo";
      email.message = `
        <p> ${student.name}, você foi convidado para participar do grupo de ${
        leaderData.name
      } 
        do Repositório de TCC's da Univap Centro!</p>
        <p> Para aceitar o grupo, acesse o ${
          "http://localhost:5173/" +
          "authorization/group/" +
          novoGrupo.id +
          "/user/" +
          student.id
        }!</p>`;
      email.title = "Você foi convidado para um grupo!";
      email.send();
    }
  }

  const arr = {
    status: "SUCCESS",
    message: "Grupo inserido com sucesso!",
    data: novoGrupo,
  };
  return response.status(200).send(arr);
};
