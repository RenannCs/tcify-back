const User = require("../../Schemas/User");
const ModelJwtToken = require("../../Model/JwtToken");

module.exports = async (request, response) => {
  const userIn = request.body.register;
  const password = request.body.password;

  /*
    const database = new ModelDatabase();
    await database.conect(); 
    */

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
        id: resolve.id,
        userType: resolve.user_type,
      });

      const arr = {
        data: resolve,
        token: token,
        status: "SUCESS",
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
