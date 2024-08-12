const Course = require("../../Schemas/Course");

module.exports = async (request, response) => {
  let course;
  try {
    const name = request.body.name;
    const description = request.body.description;

    course = new Course();
    course.name = name;
    course.description = description;
    course.status = "1";
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  course
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Curso inserido com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao inserir o curso!",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
