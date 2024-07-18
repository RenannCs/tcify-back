const User = require("../../Schemas/User");
const { BSON, ObjectId } = require("mongodb");
module.exports = async (request, response) => {
  const _id = request.params._id;

  try {
    if ((await User.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não encontrado",
      };
      return response.status(404).send(arr);
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Id inválido!",
      };
      return response.status(400).send(arr);
    } else {
      const arr = {
        status: "ERROR",
        message: "Erro do servidor, tente novamente mais tarde!",
        data: err,
      };
      return response.status(500).send(arr);
    }
  }

  User.single(_id)
    .then((data) => {
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
          : `${process.env.API_PATH}Default/profile_picture_default.webp`,
      });
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Usuário recuperado com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar o usário",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
