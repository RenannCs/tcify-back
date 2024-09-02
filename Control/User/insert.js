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

  // try {
    const name = request.body.name;
    const course_id = request.body.course_id;
    const emailUser = request.body.email;
    const user_type = request.body.user_type;
    const register = request.body.register;
    const phone_number = request.body.phone_number;
    const link = request.body.link;

    user.name = name;
    user.course_id = course_id;
    user.email = emailUser;
    user.password = register;
    user.user_type = user_type;
    user.register = register;
    user.phone_number = phone_number;
    user.link = link;
    user.status = "1";

    course = await Course.findById(course_id).exec();
    if (course == null && user_type != "Adminstrador") {
      const arr = {
        status: "ERROR",
        message: "Curso não encontrado!",
      };
      return response.status(404).send(arr);
    }

    const email = new Email();
    email.dest = emailUser;
    email.subject = "Conectado ao repositório de TCC's da Univap Centro";
    email.message = `
  <br><p> Parabéns ${user.name}! Você foi conectado ao Repositório de TCC's da Univap Centro!</p>
  <br>Seus dados:<br>
  Nome: ${user.name}<br>
  Registro: ${user.register}<br>
  Curso: ${course.name}<br>
  Tipo de usuário: ${user.user_type}<br>
  Email: ${user.email}<br>
  Senha: ${register}<br>
  `;

    email.send();
  // } catch (error) {
  //   const arr = {
  //     status: "ERROR",
  //     message: "Erro do servidor, tente novamente mais tarde!",
  //     data: error,
  //   };
  //   return response.status(500).send(arr);
  // }

  user
    .save()
    .then(async (result) => {
      let aux = await User.single(result._id);
      return aux;
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
      //Verifica se o erro veio das verificações do Schema de User
      if (reject.errors) {
        //Verifica de qual das verificações o erro veio
        if (reject.errors.user_type) {
          const arr = {
            status: "ERROR",
            message: "Tipo de usuário inválido!",
          };
          return response.status(400).send(arr);
        } else if (reject.errors.course_id) {
          const arr = {
            status: "ERROR",
            message: "Curso inválido!",
          };
          return response.status(400).send(arr);
        }
      }

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
