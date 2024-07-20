/*
retornar todos os alunos e os dados dos usuarios
pesquisa feita pelo registro de usuario
*/
const Group = require("../../Schemas/Group");
const { BSON } = require("mongodb");
module.exports = async (request, response) => {
  let _id;
  try {
    _id = request.params._id;

    if ((await Group.existsByStudent(_id)) == null) {
      const arr = {
        status: "ERROR",
        message: "Nenhum grupo foi encontrado!",
      };
      return response.status(404).send(arr);
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Usuário inválido!",
      };
      return response.status(400).send(arr);
    }
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(400).send(arr);
  }

  Group.findByStudentId(_id)
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
