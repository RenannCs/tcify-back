const { ObjectId } = require("mongodb");
const User = require("../../Schemas/User");
const Course = require("../../Schemas/Course");

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
    if ((course_id != null) & (course_id != undefined)) {
      if (
        (await Course.exists({ _id: new ObjectId(course_id) }).exec()) == null
      ) {
        const arr = {
          status: "ERROR",
          message: "Curso não existe!",
        };
        return response.status(404).send(arr);
      }
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
      return (format = {
        _id: data.id,
        name: data.name,
        register: data.register,
        email: data.email,

        course_id:
          data.user_type == "Administrador"
            ? "N/A"
            : data.course_id
            ? data.course_id._id
            : null,
        course_name:
          data.user_type == "Administrador"
            ? "N/A"
            : data.course_id
            ? data.course_id.name
            : null,

        link: data.link ? data.link : null,
        linkedin: data.linkedin ? data.linkedin : null,

        phone_number: data.phone_number ? data.phone_number : null,
        user_type: data.user_type,

        image: data.image
          ? `${process.env.API_PATH}${data.image}`
          : `${process.env.API_PATH}${process.env.USER_PROFILE_PICTURE_DEFAULT}`,
      });
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        data: resolve,
        message: "Usuário atualizado com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      if (reject.errorResponse) {
        if (reject.errorResponse) {
          if (Object.keys(reject.errorResponse.keyPattern)[0] == "email") {
            const arr = {
              status: "ERROR",
              message: "Email já está em uso!",
            };
            return response.status(409).send(arr);
          } else {
            const arr = {
              status: "ERROR",
              message: "Registro já está em uso!",
            };
            return response.status(409).send(arr);
          }
        }
      }
      const arr = {
        status: "ERROR",
        data: reject,
        message: "Erro de servidor, tente novamente mais tarde!",
      };
      return response.status(500).send(arr);
    });
};
