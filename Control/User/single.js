const { ObjectId } = require("mongodb");
const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  const id = request.params.id;

  if ((await User.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Usuário não encontrado",
    };
    return response.status(404).send(arr);
  }

  try {
    const data = await User.single(id);
    const format = {
      _id: data.id,
      name: data.name,
      register: data.register,
      email: data.email,
      course_id: data.course_id ? data.course_id._id : null,
      course_name: data.course_id ? data.course_id.name : null,
      github: data.github ? data.github : null,
      linkedin: data.linkedin ? data.linkedin : null,
      phone_number: data.phone_number ? data.phone_number : null,
      user_type: data.user_type,
      image: data.image
        ? `${process.env.API_PATH}${data.image}`
        : `${process.env.API_PATH}Default/profile_picture_default.webp`,
    };
    const arr = {
      status: "SUCCESS",
      message: "Usuário recuperado com sucesso",
      data: format,
    };
    return response.status(200).send(arr);
  } catch {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao recuperar o usário",
    };
    return response.status(400).send(arr);
  }
};
