const User = require("../../Schemas/User");
const { ObjectId } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
module.exports = async (request, response) => {
  try {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    const token_id = tokenValidationResult.decoded.payload._id;
    const token_user_type = tokenValidationResult.decoded.payload.user_type;
    const token_status = tokenValidationResult.status;

    if (
      token_status == false ||
      (await User.validateTokenId(token_id)) == false ||
      User.validatePermission(token_user_type) == false
    ) {
      const arr = {
        status: "ERROR",
        message: "Operação negada devido as permissões do usuário!",
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

  User.allFilter({ user_type: "Professor" })
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
