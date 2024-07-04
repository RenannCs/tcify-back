/*
single do grupo por id
*/
const { ObjectId } = require("mongodb");
const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  const id = request.params.id;

  if ((await Group.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Nenhum grupo encontrado!",
    };
    return response.status(404).send(arr);
  }

  Group.single(id)
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo retornado com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao buscar o grupo",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
