const Tcc = require("../../Schemas/Tcc");
const Group = require("../../Schemas/Group");

const { BSON } = require("mongodb");

module.exports = async (request, response) => {
  let group;
  let _id;
  try {
    _id = request.params._id;

    group = await Group.findByStudent(_id);

    if (group == null) {
      const arr = {
        status: "ERROR",
        message: "Nenhum projeto encontrado!",
      };
      return response.status(404).send(arr);
    }
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  Tcc.single(group.tcc_id)
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Nenhum projeto encontrado!",
        };
        return response.status(404).send(arr);
      }
      const arr = {
        status: "SUCCESS",
        message: "TCC recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch(() => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os TCC's!",
      };
      return response.status(500).send(arr);
    });
};
