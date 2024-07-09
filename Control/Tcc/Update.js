/**
 * Update de tcc
 * Pode alterar titulo, sumario , nota, status , curso
 */
const Tcc = require("../../Schemas/Tcc");

const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

const { ObjectId } = require("mongodb");

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
  const id = request.params.id;

  if ((await Tcc.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "TCC não existe",
    };
    return response.status(404).send(arr);
  }

  const title = request.body.title;
  const summary = request.body.summary;
  const grade = request.body.grade;
  const status = request.body.status;
  const course_id = request.body.course_id;

  const tcc = await Tcc.findById(id).exec();

  if (title != undefined) {
    tcc.title = title;
  }
  if (summary != undefined) {
    tcc.summary = summary;
  }
  if (grade != undefined) {
    tcc.grade = grade;
  }
  if (status != undefined) {
    tcc.status = status;
  }
  if (course_id != undefined) {
    tcc.course_id = course_id;
  }
  tcc
    .save()
    .then((resolve) => {
      const arr = {
        data: resolve,
        status: "SUCCESS",
        message: "TCC atualizado com sucesso!",
      };
      response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        data: reject,
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o TCC!",
      };
      response.status(400).send(arr);
    });
};
