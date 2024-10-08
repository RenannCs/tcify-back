const User = require("../../Schemas/User");
const Course = require("../../Schemas/Course");
module.exports = async (request, response) => {
  const _id = request.params._id;

  const name = request.body.name;
  const email = request.body.email;
  const register = request.body.register;
  const phone_number = request.body.phone_number;
  const link = request.body.link;
  const user_type = request.body.user_type;
  const status = request.body.status;
  const course_id = request.body.course_id;

  let user;

  try {
    user = await User.findById(_id).exec();
    if (user == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não encontrado!",
      };
      return response.status(404).send(arr);
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (phone_number) {

      user.phone_number = phone_number;
    }
    if (link) {
      user.link = link;
    }
    if (user_type) {
      if (!["Administrador", "Professor", "Estudante"].includes(user_type)) {
        const arr = {
          status: "ERROR",
          message: "Tipo de usuário inválido!",
        };
        return response.status(400).send(arr);
      }
      user.user_type = user_type;
    }
    if (status) {
      user.status = status;
    }
    if (course_id && course_id != "N/A") {
      const course = await Course.findById(course_id).exec();
      if (course == null) {
        const arr = {
          status: "ERROR",
          message: "Curso não existe!",
        };
        return response.status(404).send(arr);
      }
      user.course_id = course_id;
    }
    if (course_id == "" || course_id == "N/A") {
      user.course_id = undefined;
    }
    if (register) {
      user.register = register;
    }
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
    .then(async (data) => {
      //Popula o curso, mas adiciona mais uma requisição

      return await User.single(_id);
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Usuário atualizado com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
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
