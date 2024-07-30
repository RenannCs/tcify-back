const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  let status;
  let _id_list;
  try {
    _id_list = request.body;
    status = request.body.status;

    let updatedCount = 0;
    let gruposAtualizados = [];
    for (let _id of _id_list) {
      try {
        const resp = await Group.findByIdAndUpdate(_id, {
          status: status,
        }).exec();

        if (resp != null) {
          updatedCount += 1;
          gruposAtualizados.push(resp);
        }
      } catch {}
    }

    const data = {
      updatedCount: updatedCount,
      gruposAtualizados: gruposAtualizados,
    };
    const arr = {
      status: "SUCCESS",
      message: "Grupos atualizados!",
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
