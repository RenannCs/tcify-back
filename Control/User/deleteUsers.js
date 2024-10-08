const User = require("../../Schemas/User");
const fs = require("fs");

module.exports = async (request, response) => {
  try {
    const _id_list = request.body;
    const userLogged = request.userLogged;

    if (_id_list.includes(userLogged._id)) {
      const arr = {
        status: "ERROR",
        message: "Você não pode excluir a si mesmo!",
      };
      return response.status(403).send(arr);
    }

    let deletedCount = 0;
    let usuariosExcluidos = [];
    for (let _id of _id_list) {
      try {
        const resp = await User.findByIdAndDelete(_id).exec();

        if (resp.image) {
          if (fs.existsSync(resp.image)) {
            fs.unlink(resp.image, () => {});
          }
        }

        if (resp != null) {
          deletedCount += 1;
          usuariosExcluidos.push(resp);
        }
      } catch {}
    }

    const data = {
      deletedCount: deletedCount,
      usuariosExcluidos: usuariosExcluidos,
    };
    const arr = {
      status: "SUCCESS",
      message: "Usuários excluídos!",
      data: data,
    };

    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
