const Group = require("../../Schemas/Group");
const Tcc = require("../../Schemas/Tcc");
const User = require("../../Schemas/User")
module.exports = async (request, response) => {
  try {
    const _id_list = request.body;

    let deletedCount = 0;
    let gruposExcluidos = [];
    let arrIds = [];
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
        for (let _student of resp.students) {
          arrIds.push(_student);
        }
      } catch { }
    }

    User.removeGroupIds(arrIds);
    const data = {
      deletedCount: deletedCount,
      gruposExcluidos: gruposExcluidos,
    };
    const arr = {
      status: "SUCCES",
      message: deletedCount + " Grupo(s) excluído(s) com sucesso!",
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
