const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  const _id = request.params._id;

  const name = request.body.name;
  const email = request.body.email;
  const register = request.body.register;
  const password = request.body.password;
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
    if (name != undefined) {
      user.name = name;
    }
    if (email != undefined) {
      user.email = email;
    }
    if (password != undefined) {
      user.password = password;
    }
    if (phone_number != undefined) {
      user.phone_number = phone_number;
    }
    if (link != undefined) {
      user.link = link;
    }
    if (user_type != undefined) {
      user.user_type = user_type;
    }
    if (status != undefined) {
      user.status = status;
    }
    if (course_id) {
      user.course_id = course_id;
    }

    if (register != undefined) {
      user.register = register;
    }
  } catch (error) {
    if (error.name == "CastError") {
      const arr = {
        status: "ERROR",
        message: "Usuário inválido!",
      };
      return response.status(400).send(arr);
    } else {
      const arr = {
        status: "ERROR",
        message: "Erro do servidor, tente novamente mais tarde!",
        data: error,
      };
      return response.status(500).send(arr);
    }
  }

  user
    .save()
    .then(async (data) => {
      //Popula o curso, mas adiciona mais uma requisição

      data = await data.populate("course_id");
      return {
        _id: data.id,
        name: data.name,
        register: data.register,
        email: data.email,

        course_id: data.course_id ? data.course_id._id : "N/A",
        course: data.course_id ? data.course_id.name : "N/A",

        link: data.link,

        phone_number: data.phone_number,
        user_type: data.user_type,

        image: data.image
          ? `${process.env.API_PATH}${data.image}`
          : `${process.env.API_PATH}${process.env.USER_PROFILE_PICTURE_DEFAULT}`,

        status: data.status,
      };
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
