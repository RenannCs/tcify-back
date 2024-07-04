const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  const fields = [
    "register",
    "name",
    "email",
    "phone_number",
    "user_type",
    "course_name",
  ];

  try {
    const data = await User.allFilterFields({ user_type: "1" }, fields);
    const format = data.map((user) => ({
      _id: user._id,
      register: user.register,
      course_id: user.course_id ? user.course_id._id : null,
      course_name: user.course_id ? user.course_id.name : null,
      name: user.name,
      email: user.email ? user.email : null,
      phone_number: user.phone_number ? user.phone_number : null,
      user_type: user.user_type,
    }));
    const arr = {
      status: "SUCCESS",
      message: "Dados recuperados com sucesso",
      data: format,
    };
    return response.status(200).send(arr);
  } catch {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao recuperar os dados",
    };
    return response.status(400).send(arr);
  }
};
