const { ObjectId, BSON } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
const fs = require("fs");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  const _id = request.params._id;

  try {
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

    //Verificar se o usuário a ser excluído existe
    if ((await User.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não existe!",
      };
      return response.status(404).send(arr);
    }

    const user = await User.findById(_id).exec();

    if (user.image != null) {
      if (fs.existsSync(user.image)) {
        fs.unlink(user.image, (error) => {
          if (error) {
            const arr = {
              status: "ERROR",
              message:
                "Ocorreu um erro ao excluir a imagem do usuário! Usuário não exlcuído!",
              data: error,
            };
            return response.status(500).send(arr);
          }
        });
      }
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Id inválido!",
      };
      return response.status(400).send(arr);
    }
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  User.findByIdAndDelete(_id)
    .exec()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Usuário excluído com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao tentar excluir o usuário!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
