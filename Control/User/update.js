/**
 * ATUALIZAR USUÁRIO
 *
 * Pode alterar  número de telefone, link, linkedin, email
 *
 *
 */
const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  const _id = request.params._id;
  const phone_number = request.body.phone_number;
  const link = request.body.link;
  const linkedin = request.body.linkedin;
  const email = request.body.email;

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
    if (email != undefined) {
      user.email = email;
    }
    if (phone_number != undefined) {
      user.phone_number = phone_number;
    }
    if (link != undefined) {
      user.link = link;
    }
    if (linkedin != undefined) {
      user.linkedin = linkedin;
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
    .then(async (data)=>{

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
          }
        }
      }
      const arr = {
        status: "ERROR",
        data: reject,
        message: "Ocorreu um erro ao atualizar o usuário!",
      };
      return response.status(500).send(arr);
    });
};
