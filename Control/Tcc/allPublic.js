const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  Tcc.allFilter({ status: "1" })
    .then((data) => {
      return (format = data.map((tcc) => ({
        _id: tcc.id,

        title: tcc.title ? tcc.title : null,
        summary: tcc.summary ? tcc.summary : null,

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

        supervisor: tcc.supervisor_id ? tcc.supervisor_id.name : null,
        supervisor_id: tcc.supervisor_id ? tcc.supervisor_id._id : null,

        group_id: tcc.group_id ? tcc.group_id._id : null,
        students: tcc.group_id ? tcc.group_id.students : null,

        course_id: tcc.course_id ? tcc.course_id._id : null,
        course: tcc.course_id ? tcc.course_id.name : null,

        date: new Date(tcc.date).getFullYear().toString(),
      })));
    })
    .then((resolve) => {
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
