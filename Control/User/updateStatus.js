const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  const status = request.body.status;
  const _id_list = request.body._id_list;

  try {
    let updatedCount = 0;
    let usuariosAtualizados = [];
    for (let _id of _id_list) {
      try {
        const resp = await User.findByIdAndUpdate(_id, { status: status });
        resp.status = status;
        if (resp != null) {
          updatedCount += 1;
          usuariosAtualizados.push(resp);
        }
      } catch {}
    }

    const data = {
      updatedCount: updatedCount,
      usuariosAtualizados: usuariosAtualizados,
    };
    const arr = {
      status: "SUCCESS",
      message: "Usuários atualizados!",
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
