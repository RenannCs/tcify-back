const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  User.all()
    .then((data) => {
      return (dataFormat = data.map((user) => ({
        _id: user._id,
        register: user.register,
        name: user.name,

        course_id:
          user.user_type == "Administrador"
            ? null
            : user.course_id
            ? user.course_id._id
            : null,
        course_name:
          user.user_type == "Administrador"
            ? null
            : user.course_id
            ? user.course_id.name
            : null,

        email: user.email ? user.email : null,
        phone_number: user.phone_number ? user.phone_number : null,

        link: user.link ? user.link : null,
        image: user.image
          ? `${process.env.API_PATH}${user.image}`
          : `${process.env.API_PATH}${process.env.USER_PROFILE_PICTURE_DEFAULT}`,

        user_type: user.user_type,

        status: user.status,
      })));
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Dados recuperados com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao buscar os usuários!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
