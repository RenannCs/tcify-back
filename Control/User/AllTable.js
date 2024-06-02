const ModelUser = require("../../Model/User");

module.exports = async (request, response) => {
  const user = new ModelUser();
  const fields = ["register", "name", "email", "phone_number", "user_type" , "course_id"];

  try{
    const data = await user.allFields(fields);
    const format = data.map((user)=>({
      _id: user._id,
      register: user.register,
      course_name: user.course_id.name,
      name: user.name,
      
      email: user.email,
      phone_number: user.phone_number ? user.phone_number : null,
      user_type: user.user_type
    }));
    const arr = {
      status: "SUCESS",
      message: "Dados recuperados com sucesso",
      data: format
    };
    return response.status(200).send(arr);
  }catch{
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao recuperar os dados"
    };
    return response.status(400).send(arr);
  }
};
