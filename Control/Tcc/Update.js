/**
 * Update de tcc
 * Pode alterar titulo, sumario
 */
const Tcc = require("../../Schemas/Tcc");

const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let tcc;

  let title;
  let summary;
  try {
    const _id = request.params._id;
    tcc = await Tcc.findById(_id).exec();

    if (tcc == null) {
      const arr = {
        status: "ERROR",
        message: "TCC não existe",
      };
      return response.status(404).send(arr);
    }

    title = request.body.title;
    summary = request.body.summary;

    if (title) {
      tcc.title = title;
    }
    if (summary) {
      tcc.summary = summary;
    }
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  tcc
    .save()
    .then(async (data) => {
      const aux = await Tcc.single(data);

      return {
        _id: aux.id,

        title: aux.title,
        summary: aux.summary,
        grade: aux.grade,

        status: aux.status,

        document: aux.document
          ? `${process.env.API_PATH}${aux.document}`
          : null,

        monography: aux.monography
          ? `${process.env.API_PATH}${aux.monography}`
          : null,

        zip: aux.zip ? `${process.env.API_PATH}${aux.zip}` : null,

        image: aux.image
          ? `${process.env.API_PATH}${aux.image}`
          : `${process.env.API_PATH}${process.env.aux_PICTURE_DEFAULT}`,

        supervisor: aux.supervisor_id ? aux.supervisor_id.name : null,
        supervisor_id: aux.supervisor_id ? aux.supervisor_id._id : null,

        group_id: aux.group_id ? aux.group_id._id : null,
        students: aux.group_id ? aux.group_id.students : null,

        course_id: aux.course_id ? aux.course_id._id : null,
        course: aux.course_id ? aux.course_id.name : null,

        date: new Date(aux.date).getFullYear().toString(),
      };
    })
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
      response.status(500).send(arr);
    });
};
