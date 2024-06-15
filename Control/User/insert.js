/**
 * Adiciona um novo usuário qualquer [aluno, professor ou admin]
 *
 * Coloca nome, curso, email, senha, tipo usuario e registro
 */
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Model/User");
const Email = require("../../Model/Email");
const Course = require("../../Model/Course");
const JwtToken = new ModelJwtToken();

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

  const name = request.body.name;
  const course_id = request.body.course_id;
  const emailUser = request.body.email;
  const user_type = request.body.user_type;
  const register = request.body.register;

  const strAll =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@";
  let password = "";

  for (let i = 0; i < 6; i++) {
    const n = Math.floor(Math.random() * strAll.length);
    password += strAll[n];
  }

  const user = new User();
  user.name = name;
  user.course_id = course_id;
  user.email = emailUser;
  user.password = password;
  user.user_type = user_type;
  user.register = register;

  if ((await user.exists()) != null) {
    const arr = {
      status: "ERROR",
      message: "Registro ou email já em uso!",
    };
    return response.status(409).send(arr);
  }

  const course = new Course();
  course.id = course_id;
  const _course = await course.single();
  if (_course == null) {
    const arr = {
      status: "ERROR",
      message: "Curso não existe!",
    };
    return response.status(404).send(arr);
  }
  user.course_name = _course.name
  let user_typeStr = "";
  if (user_type == "0") {
    user_typeStr = "Aluno";
  } else if (user_typeStr == "1") {
    user_typeStr = "Professor";
  } else {
    user_typeStr = "Administrador";
  }

  const email = new Email();
  email.dest = emailUser;
  email.subject = "Conectado ao repositório de TCC's da Univap Centro";
  email.message = `
  <br><p> Parabéns ${user.name}! Você foi conectado ao Repositório de TCC's da Univap Centro!</p>
  <br>Seus dados:<br>
  Nome: ${user.name}<br>
  Registro: ${user.register}<br>
  Curso: ${_course.name}<br>
  Tipo de usuário: ${user_typeStr}<br>
  Email: ${user.email}<br>
  Senha: ${password}<br>
  `;
  try {
     email.send();
  } catch {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao enviar o email! Usuário não adicionado!",
    };
    return response.status(400).send(arr);
  }
  user
    .insert()
    .then((result) => {
      const arr = {
        data: result,
        status: "SUCCESS",
        message: "Usuário inserido com sucesso!",
      };
      response.status(200).send(arr);
    })
    .catch((error) => {
      const arr = {
        status: "ERROR",
        message: "Erro ao inserir usuário!",
        error: error.message,
      };
      response.status(400).send(arr);
    });
};
