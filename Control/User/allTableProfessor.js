const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  User.allFilter({"user_type": "Professor"})
    .then((data) => {
      return (dataFormat = data.map((user) => ({
        _id: user._id,
        register: user.register,
        name: user.name,

        course_name: user.course_id ? user.course_id.name : null,
        course_id: user.course_id ? user.course_id.id : null,

        email: user.email ? user.email : null,
        phone_number: user.phone_number ? user.phone_number : null,
        link: user.link ? user.link : null,
        image: user.image ? user.image : "Default/profile_picture_default.webp",

        user_type: user.user_type,

        enabled: user.enabled,
      })));
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Dados recuperados com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    });
};
