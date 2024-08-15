const { ObjectId, BSON } = require("mongodb");
const User = require("../../Schemas/User");
const md5 = require("md5");
module.exports = async (request, response) => {
  const _id = request.params._id;
  const password = request.body.password;
  const newPassword = request.body.newPassword;

  let user;

  try {
    user = await User.findById(_id);
    if (user == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não existe!",
      };
      return response.status(404).send(arr);
    }
    if (user.password != md5(password)) {
      const arr = {
        status: "ERROR",
        message: "Senha incorreta!",
      };
      return response.status(401).send(arr);
    }

    if (user.password == md5(newPassword)) {
      const arr = {
        status: "ERROR",
        message: "Senha já cadastrada!",
      };
      return response.status(401).send(arr);
    }

    user.password = newPassword;
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
        course_name: data.course_id ? data.course_id.name : "N/A",

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
        message: "Senha atualizada com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Erro ao atualizar o senha!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
