const User = require("../../Schemas/User");
const ModelJwtToken = require("../../Model/JwtToken");

module.exports = async (request, response) => {
  const userIn = request.body.register;
  const password = request.body.password;

  User.login(userIn, password)
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          data: resolve,
          status: "ERROR",
          message: "Registro ou senha incorretos!",
        };
        return response.status(401).send(arr);
      }

      const JwtToken = new ModelJwtToken();
      const token = JwtToken.createToken({
        _id: resolve.id,
        user_type: resolve.user_type,
      });

      // Append do token no objeto resolve
      const format = {
        _id: resolve._id,
        user_type: resolve.user_type ? resolve.user_type : null,
        token: token,
      };

      const arr = {
        data: format,
        status: "SUCCESS",
        message: "Usuário logado com sucesso!",
      };

      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        data: reject,
        message: "Erro ao fazer login!",
      };
      response.status(400).send(arr);
    });
};
