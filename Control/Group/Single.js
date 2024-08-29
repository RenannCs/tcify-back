/*
single do grupo por _id
*/
const { ObjectId, BSON } = require("mongodb");
const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  const _id = request.params._id;

  Group.single(_id)
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Nenhum grupo encontrado!",
        };
        return response.status(404).send(arr);
      }
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
