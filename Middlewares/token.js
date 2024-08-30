const User = require("../Schemas/User");
const Group = require("../Schemas/Group");
const JwtToken = require("../Model/JwtToken");

module.exports = async (request, response, next) => {
  try {
    const jwttoken = new JwtToken();

    const token = request.headers.authorization;
    const tokenResult = jwttoken.validateToken(token);

    if (tokenResult.status) {
      const token_id = tokenResult.decoded.payload._id;
      const token_user_type = tokenResult.decoded.payload.user_type;

      const user = await User.single(token_id);
      if (user != null) {
        if (
          ["Professor", "Administrador", "Estudante"].includes(user.user_type) &
          (user.user_type == token_user_type)
        ) {
          request.userLogged = user;

          next();
        } else {
          const arr = {
            status: "ERROR",
            message: "Operação negada devido as permissões do usuário!",
          };
          return response.status(403).send(arr);
        }
      } else {
        const arr = {
          status: "ERROR",
          message: "Usuário que requisitou o pedido não existe!",
        };
        return response.status(404).send(arr);
      }
    } else {
      const arr = {
        status: "ERROR",
        message: "Chave de validação inválida!",
      };
      return response.status(401).send(arr);
    }
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao verificar suas permissões!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
