const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  User.all()
    .then((data) => {
      return (format = data.map((user) => ({
        _id: user.id,
        name: user.name,
        course_id: user.course_id ? user.course_id._id : null,
        course_name: user.course_id ? user.course_id.name : null,
        register: user.register,
        email: user.email ? user.email : null,
        user_type: user.user_type,
        phone_number: user.phone_number ? user.phone_number : null,
        image: user.image ? user.image : "Default/profile_picture_default.webp",
      })));
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Usuários recuperados com sucesso!",
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
