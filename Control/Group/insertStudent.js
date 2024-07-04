/**
 * Insere um aluno ao grupo
 */
const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
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

  if ((await Group.exists({ _id: new ObjectId(id) })) == null) {
    const arr = {
      status: "ERROR",
      message: "Grupo não existe!",
    };
    return response.status(404).send(arr);
  }
  if ((await User.exists({ register: register })) == null) {
    const arr = {
      status: "ERROR",
      message: "Aluno não existe!",
    };
    return response.status(404).send(arr);
  }

  const user = await User.findOne({ register: register }).exec();
  if ((await Group.existsByStudent(user.id)) != null) {
    const arr = {
      status: "ERROR",
      message: "Aluno já inserido em um grupo",
    };
    return response.status(400).send(arr);
  }

  const email = new Email();
  email.dest = user.email;
  email.subject = "Você foi adicionado a um grupo!";
  email.message = `
        <p> ${user.name}, você foi adicionado a um grupo do Repositório de TCC's da Univap Centro!</p>
        <p> Para verificar o seu grupo, acesse o portal!</p>`;
  email.title = "Adicionado a um grupo";
  email.send();

  const group = await Group.findById(id).exec();
  let newStudents = group.students;
  newStudents.push(user.id);

  group.students = newStudents;

  group
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Aluno inserido com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao inserir o aluno",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
