const ModelUser = require("../../Model/User");

module.exports = async (request, response) => {
  const id = request.params.id;
  const user = new ModelUser(id);

  const fields = [
    "_id",
    "name",
    "register",
    "email",
    "course_name",
    "course_id",
    "github",
    "linkedin",
    "phone_number",
    "user_type",
    "image"
  ];

  if(await user.exists() == null){
    const arr = {
      status: "ERROR",
      message: "Usuário não encontrado",
    };
    return response.status(404).send(arr);
  }

  try{
    const data = await user.singleFields(fields);
    const format = {
      _id: data._id,
      name: data.name,
      register: data.register,
      email: data.email,
      course_id: data.course_id._id,
      course_name: data.course_id.name,
      github: data.github ? data.github : null,
      linkedin: data.linkedin ? data.linkedin : null,
      phone_number: data.phone_number ? data.phone_number : null,
      user_type: data.user_type,
      user_image: data.image ? data.image : "Default/profile_picture_default.webp"
    }
    const arr = {
      status: "SUCESS",
      message: "Usuário recuperado com sucesso",
      data: format
    };
    return response.status(200).send(arr);
  }catch{
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao recuperar o usário"
    }
    return response.status(400).send(arr);
  }
}
