const Tcc = require("../../Schemas/Tcc");
const { ObjectId } = require("mongodb");

module.exports = async (request, response) => {
  let _id;
  try {
    _id = request.params._id;
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  Tcc.allFilter({ supervisor: new ObjectId(_id) })
    .then((data) => {
      return (format = data.map((tcc) => ({
        _id: tcc.id,

        title: tcc.title,
        summary: tcc.summary ? tcc.summary : null,
        grade: tcc.grade,

        status: tcc.status,

        document: tcc.document
          ? `${process.env.API_PATH}${tcc.document}`
          : null,

        monography: tcc.monography
          ? `${process.env.API_PATH}${tcc.monography}`
          : null,

        zip: tcc.zip ? `${process.env.API_PATH}${tcc.zip}` : null,

        image: tcc.image
          ? `${process.env.API_PATH}${tcc.image}`
          : `${process.env.API_PATH}${process.env.TCC_PICTURE_DEFAULT}`,

        supervisor: tcc.supervisor ? tcc.supervisor.name : null,
        supervisor_id: tcc.supervisor ? tcc.supervisor._id : null,

        group_id: tcc.group_id ? tcc.group_id._id : null,
        students: tcc.group_id ? tcc.group_id.students : null,

        course_id: tcc.course_id ? tcc.course_id._id : null,
        course: tcc.course_id ? tcc.course_id.name : null,

        date: new Date(tcc.date).getFullYear().toString(),
      })));
    })
    .then((resolve) => {
      if (resolve.length == 0) {
        const arr = {
          status: "ERROR",
          message: "O professor não possui nenhum TCC!",
        };
        return response.status(404).send(arr);
      }

      const arr = {
        status: "SUCCESS",
        message: "TCC's recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os TCC's!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
