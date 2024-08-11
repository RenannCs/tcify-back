const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  const _id = request.params._id;
  
  User.single(_id)
    .then((data) => {
      
      if (data == null) {
        return null;
      }

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
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Usuário não encontrado!",
        };
        return response.status(404).send(arr);
      }

      const arr = {
        status: "SUCCESS",
        message: "Usuário recuperado com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      if (reject.name == "CastError") {
        const arr = {
          status: "ERROR",
          message: "Usuário inválido!",
        };
        return response.status(400).send(arr);
      }
      const arr = {
        status: "ERROR",
        message: "Erro de servidor, tente novamente mais tarde!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
