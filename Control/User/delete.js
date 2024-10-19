const User = require("../../Schemas/User");
const fs = require("fs");

module.exports = async (request, response) => {
  const _id = request.params._id;

  try {
    const userLogged = request.userLogged;

    if (userLogged._id == _id) {
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
    .then( (data) => {
      if (data == null) {
        return null;
      }

      if (data.image) {
        if (fs.existsSync(data.image)) {
          fs.unlink(data.image, (error) => {});
        }
      }
      
      return data;
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
      const arr = {
        status: "ERROR",
        message: "Erro de servidor, tente novamente mais tarde!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
