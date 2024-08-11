/**
 * Adiciona um novo usuário qualquer [aluno, professor ou admin]
 *
 * Coloca nome, curso, email, senha, tipo usuario, registro, telefone, link
 */

const User = require("../../Schemas/User");
const Email = require("../../Model/Email");
const Course = require("../../Schemas/Course");
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  const user = new User();
  let course;

  try {
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
    user.status = "1";

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
      const aux = result.toJSON();
      aux.image = `${process.env.API_PATH}${process.env.USER_PROFILE_PICTURE_DEFAULT}`;
      aux.course_name = aux.user_type == "Administrador" ? null : course.name;
      const arr = {
        data: aux,
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
