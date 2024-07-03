const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  try {
    const data = await User.all();

    const dataFormat = data.map((user) => ({
      _id: user.id,
      name: user.name,
      course_id: user.course_id ? user.course_id._id : null,
      course_name: user.course_id ? user.course_id.name : null,
      register: user.register,
      email: user.email ? user.email : null,
      user_type: user.user_type,
      phone_number: user.phone_number ? user.phone_number : null,
      image: user.image ? user.image : "Default/profile_picture_default.webp",
    }));

    const arr = {
      status: "SUCESS",
      message: "Usuário recuperados com sucesso!",
      data: dataFormat,
    };
    return response.status(200).send(arr);
  } catch (err) {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao buscar os usuários!",
      data: err,
    };
    return response.status(400).send(arr);
  }

  /*
    //try{
        const data = await user.all();
        const format = data.map((user)=>({
            _id: user.id,
            name: user.name,
            course_id: user.course_id ? user.course_id._id : null,
            course_name: user.course_id ? user.course_id.name: null,
            email: user.email,
            user_type: user.user_type,
            register: user.register,
            phone_number: user.phone_number ? user.phone_number : null,
            image: user.image ? user.image: "Default/profile_picture_default.webp"
        }));
        const arr = {
            status: "SUCESS",
            message: "Usuário recuperados com sucesso!",
            data: format
        };
        return response.status(200).send(arr);
    //}catch{
        /*const arr = {
            status: "ERROR",
            message: "Ocorreu um erro ao recuperar os usuários!",
        };
        return response.status(400).send(arr);
    //}*/
};
