const { ObjectId, BSON } = require("mongodb");
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
    if ((await User.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não existe!",
      };
      return response.status(404).send(arr);
    }

    user = await User.findById(_id).exec();

    if (name != undefined) {
      user.name = name;
    }
    if (email != undefined) {
      const checkUser = await User.exists({ email: email }).exec();
      if (checkUser != null) {
        if (checkUser._id != _id) {
          const arr = {
            status: "ERROR",
            message: "Email já está em uso!",
          };
          return response.status(409).send(arr);
        }
      }
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
      const checkUser = await User.exists({ register: register }).exec();
      if (checkUser != null) {
        if (checkUser._id != user.id) {
          const arr = {
            status: "ERROR",
            message: "Email já está em uso!",
          };
          return response.status(409).send(arr);
        }
      }
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
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        data: resolve,
        message: "Usuário atualizado com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        data: reject,
        message: "Ocorreu um erro ao atualizar o usuário!",
      };
      return response.status(500).send(arr);
    });
};
