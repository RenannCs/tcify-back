/*
retornar todos os alunos e os dados dos usuarios
pesquisa feita pelo registro de usuario
*/
//const ModelJwtToken = require('../../Model/JwtToken');
//const JwtToken = new ModelJwtToken();

const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  /*const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== true) {
        const arr = {
            status: 'ERROR',
            message: 'Invalid token! If the problem persists, please contact our technical support.',
            error: tokenValidationResult.error
        };
        return response.status(401).send(arr);
    }*/

  const id = request.params.id;

  if ((await Group.existsByStudent(id)) == null) {
    const arr = {
      status: "ERROR",
      message: "Nenhum grupo foi encontrado!",
    };
    return response.status(404).send(arr);
  }
  Group.findByStudentId(id)
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
