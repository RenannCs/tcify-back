const Group = require("../../Schemas/Group");
const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  try {
    const _id_list = request.body._id_list;

    let deletedCount = 0;
    let gruposExcluidos = [];
    for (let _id of _id_list) {
      try {
        const resp = await Group.findByIdAndDelete(_id).exec();
        if (resp.tcc_id != null) {
          await Tcc.deleteOne({ _id: resp.tcc_id }).exec();
        }
        if (resp != null) {
          deletedCount += 1;
          gruposExcluidos.push(resp);
        }
      } catch {}
    }

    const data = {
      deletedCount: deletedCount,
      gruposExcluidos: gruposExcluidos,
    };
    const arr = {
      status: "SUCCES",
      message: "Grupos excluídos!",
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
