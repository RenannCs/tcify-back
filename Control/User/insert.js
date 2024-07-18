/**
 * Adiciona um novo usuário qualquer [aluno, professor ou admin]
 *
 * Coloca nome, curso, email, senha, tipo usuario, registro, telefone, link
 */
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
const Email = require("../../Model/Email");
const Course = require("../../Schemas/Course");
const { ObjectId, BSON } = require("mongodb");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  const user = new User();
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

    const name = request.body.name;
    const course_id = request.body.course_id;
    const emailUser = request.body.email;
    const user_type = request.body.user_type;
    const register = request.body.register;
    const phone_number = request.body.phone_number;
    const link = request.body.link;

    const strAll =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@";
    let password = "";

    for (let i = 0; i < 6; i++) {
      const n = Math.floor(Math.random() * strAll.length);
      password += strAll[n];
    }

    user.name = name;
    user.course_id = course_id;
    user.email = emailUser;
    user.password = password;
    user.user_type = user_type;
    user.register = register;
    user.phone_number = phone_number;
    user.link = link;
    user.status = true;

    if ((await User.exists({ register: register })) != null) {
      const arr = {
        status: "ERROR",
        message: "Registro já em uso!",
      };
      return response.status(409).send(arr);
    }
    if ((await User.exists({ email: emailUser })) != null) {
      const arr = {
        status: "ERROR",
        message: "Email já em uso!",
      };
      return response.status(409).send(arr);
    }

    let course;
    if (user_type != "Administrador") {
      if (
        (await Course.exists({ _id: new ObjectId(course_id) }).exec()) == null
      ) {
        const arr = {
          status: "ERROR",
          message: "Curso não existe!",
        };
        return response.status(404).send(arr);
      }
      course = await Course.findById(course_id).exec();
    }
    /*
    const email = new Email();
    email.dest = emailUser;
    email.subject = "Conectado ao repositório de TCC's da Univap Centro";
    email.message = `
  <br><p> Parabéns ${
    user.name
  }! Você foi conectado ao Repositório de TCC's da Univap Centro!</p>
  <br>Seus dados:<br>
  Nome: ${user.name}<br>
  Registro: ${user.register}<br>
  Curso: ${user_type != "Administrador" ? course.name : "Administrador"}<br>
  Tipo de usuário: ${user_type}<br>
  Email: ${user.email}<br>
  Senha: ${password}<br>
  `;

    email.send();*/
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Curso selecionado inválido!",
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

  user
    .save()
    .then((result) => {
      result.image = result.image
        ? result.image
        : `${process.env.API_PATH}Default/profile_picture_default.webp`;
      const arr = {
        data: result,
        status: "SUCCESS",
        message: "Usuário inserido com sucesso!",
      };
      response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Erro ao inserir usuário!",
        data: reject,
      };
      response.status(500).send(arr);
    });
};
