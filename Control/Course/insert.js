const Course = require("../../Schemas/Course");
const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  const authorizationHeader = request.headers.authorization;
  const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

  if (tokenValidationResult.status !== true) {
    const arr = {
      status: "ERROR",
      message:
        "Invalid token! If the problem persists, please contact our technical support.",
      error: tokenValidationResult.error,
    };
    return response.status(401).send(arr);
  }

  const name = request.body.name;

  const course = new Course();
  course.name = name;

  course
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCESS",
        message: "Curso inserido com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao inserir o curso",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
