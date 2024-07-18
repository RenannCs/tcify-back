const User = require("../../Schemas/User");

const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
const { ObjectId } = require("mongodb");
module.exports = async (request, response) => {
  try {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    //Verificar se o id do token existe
    if (
      (await User.exists({
        _id: new ObjectId(tokenValidationResult.decoded.payload._id),
      }).exec()) == null
    ) {
      const arr = {
        status: "ERROR",
        message: "Operação negada devido as condições do usuário!",
      };
      return response.status(403).send(arr);
    }

    //Verificar se o user é adm ou professor
    if (
      !["Administrador", "Professor"].includes(
        tokenValidationResult.decoded.payload.user_type
      )
    ) {
      const arr = {
        status: "ERROR",
        message: "Operação negada devido as permissões de usuário!",
      };
      return response.status(403).send(arr);
    }

    //Verificar o token
    if (tokenValidationResult.status !== true) {
      const arr = {
        status: "ERROR",
        message:
          "Invalid token! If the problem persists, please contact our technical support.",
        error: tokenValidationResult.error,
      };
      return response.status(401).send(arr);
    }
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  User.allFilter({ user_type: "Administrador" })
    .then((data) => {
      return (dataFormat = data.map((user) => ({
        _id: user._id,
        register: user.register,
        name: user.name,

        course_name: user.course_id ? user.course_id.name : "N/A",
        course_id: user.course_id ? user.course_id.id : "N/A",

        email: user.email ? user.email : null,
        phone_number: user.phone_number ? user.phone_number : null,
        link: user.link ? user.link : null,
        image: user.image
          ? `${process.env.API_PATH}${user.image}`
          : `${process.env.API_PATH}Default/profile_picture_default.webp`,

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
