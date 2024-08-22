const Tcc = require("../../Schemas/Tcc");
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let _id;
  try {
    _id = request.params._id;

    if ((await Tcc.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Nenhum TCC encontrado!",
      };
      return response.status(404).send(arr);
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "TCC inválido!",
      };
      return response.status(400).send(arr);
    }
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  Tcc.single(_id)
    .then((tcc) => {
      return (dataFormat = {
        _id: tcc.id,

        title: tcc.title ? tcc.title : null,
        summary: tcc.summary ? tcc.summary : null,
        grade: tcc.grade,

        status: tcc.status ? tcc.status : null,

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
        course_name: tcc.course_id ? tcc.course_id.name : null,

        date: new Date(tcc.date).getFullYear().toString(),
      });
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "TCC's recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch(() => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar o TCC!",
      };
      return response.status(500).send(arr);
    });
};
