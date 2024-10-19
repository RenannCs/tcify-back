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

    if (name == null || register == null || user_type == null) {
      const arr = {
        status: "ERROR",
        message: "Não foi possível adicionar o usuário!",
      };
      return response.status(400).send(arr);
    }

    if (!["Estudante", "Professor", "Administrador"].includes(user_type)) {
      const arr = {
        status: "ERROR",
        message: "Tipo de usuário inválido!",
      };
      return response.status(400).send(arr);
    }

    user.name = name;
    user.course_id = course_id;
    user.email = emailUser;
    user.password = register;
    user.user_type = user_type;
    user.register = register;
    user.phone_number = phone_number;
    user.link = link;
    user.status = "1";

    if (course_id && course_id != "N/A") {
      course = await Course.findById(course_id).exec();
      if (course == null) {
        const arr = {
          status: "ERROR",
          message: "Curso não encontrado!",
          course_id: course_id,
        };
        return response.status(404).send(arr);
      }
    } else if (user_type != "Administrador") {
      const arr = {
        status: "ERROR",
        message: "Curso não encontrado!",
        course_id: course_id,
      };
      return response.status(404).send(arr);
    }else{
      user.course_id = undefined;
    }
    
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
  Curso: ${course ? course.name : "Administrador"}<br>
  Tipo de usuário: ${user.user_type}<br>
  Email: ${user.email}<br>
  Senha: ${register}<br>
  `;

    email.send();
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  user
    .save()
    .then((user) => {
      return {
        _id: user._id,
        register: user.register,
        name: user.name,

        course_id: course ? course._id : "N/A",
        course: course ? course.name : "N/A",

        group_id: user.group_id,

        email: user.email,
        phone_number: user.phone_number,

        link: user.link,
        image: user.image
          ? `${process.env.API_PATH}${user.image}`
          : `${process.env.API_PATH}${process.env.USER_PROFILE_PICTURE_DEFAULT}`,

        user_type: user.user_type,

        status: user.status,
      };
    })
    .then((data) => {
      const arr = {
        data: data,
        status: "SUCCESS",
        message: "Usuário inserido com sucesso!",
      };
      response.status(200).send(arr);
    })
    .catch((reject) => {
      //Verifica se o codigo de erro é de chave duplicada do mongoDB
      if (reject.code == 11000) {
        const arr = {
          status: "ERROR",
          message: "Registro ou email já em uso!",
        };
        return response.status(409).send(arr);
      }
      //Mensagem para erro desconhecido
      const arr = {
        status: "ERROR",
        message: "Erro de servidor, tente novamente mais tarde!",
        data: reject,
      };
      response.status(500).send(arr);
    });
};
