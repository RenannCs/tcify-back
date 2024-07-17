const { ObjectId } = require("mongodb");
const Course = require("../../Schemas/Course");
//const ModelJwtToken = require('../../Model/JwtToken');

//const JwtToken = new ModelJwtToken();

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

  if ((await Course.exists({ _id: new ObjectId(id) })) == null) {
    const arr = {
      status: "ERROR",
      message: "Curso não existe!",
    };
    return response.status(404).send(arr);
  }

  Course.findById(id)
    .exec()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Curso recuperado com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Oorreu um erro ao buscar o curso!",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
