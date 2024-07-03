/*
single do grupo por id
*/
const Group = require("../../Model/Group");

module.exports = async (request, response) => {
  const id = request.params.id;

  const group = new Group();
  group.id = id;

  group
    .single()
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Não foi encontrado nenhum grupo com o Id fornecido",
        };
        return response.status(404).send(arr);
      }
      const arr = {
        status: "SUCESS",
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
