const Course = require("../../Schemas/Course");

module.exports = async (request, response) => {
  try {
    const _id_list = request.body._id_list;

    let deletedCount = 0;
    let cursosExcluidos = [];
    for (let _id of _id_list) {
      try {
        let resp = await Course.findByIdAndDelete(_id).exec();

        if (resp != null) {
          deletedCount += 1;
          cursosExcluidos.push(resp);
        }
      } catch {}
    }

    const data = {
      deletedCount: deletedCount,
      cursosExcluidos: cursosExcluidos,
    };
    const arr = {
      status: "SUCCESS",
      message: "Cursos excluídos!",
      data: data,
    };
    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
