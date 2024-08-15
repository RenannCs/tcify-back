const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
const fs = require("fs");

module.exports = async (request, response) => {
  const _id = request.params._id;

  try {
    const JwtToken = new ModelJwtToken();
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    const token_id = tokenValidationResult.decoded.payload._id;

    //Verificar se os ids são iguais (usuario e adm/professor)
    if (token_id == _id) {
      const arr = {
        status: "ERROR",
        message: "Você não pode excluir a si mesmo!",
      };
      return response.status(403).send(arr);
    }
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  User.findByIdAndDelete(_id)
    .exec()
    .then(async (data) => {
      if (data == null) {
        return null;
      }

      if (data.image) {
        if (fs.existsSync(data.image)) {
          fs.unlink(data.image, (error) => {});
        }
      }
      //Menos uma requisição sem popular
      //return data;
      //Adiciona mais uma requisição mas popula o curso
      data = await data.populate("course_id");
      return {
        _id: data.id,
        name: data.name,
        register: data.register,
        email: data.email,

        course_id: data.course_id ? data.course_id._id : "N/A",
        course_name: data.course_id ? data.course_id.name : "N/A",

        link: data.link,

        phone_number: data.phone_number,
        user_type: data.user_type,

        image: data.image
          ? `${process.env.API_PATH}${data.image}`
          : `${process.env.API_PATH}${process.env.USER_PROFILE_PICTURE_DEFAULT}`,

        status: data.status,
      };
    })
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Usuário não existe!",
        };
        return response.status(404).send(arr);
      }
      const arr = {
        status: "SUCCESS",
        message: "Usuário excluído com sucesso!",
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
