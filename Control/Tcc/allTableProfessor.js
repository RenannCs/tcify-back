const Tcc = require("../../Schemas/Tcc");
const { ObjectId } = require("mongodb");

module.exports = async (request, response) => {
  const id = request.params.id;

  Tcc.allFilter({ supervisor: new ObjectId(id) })
    .then((data) => {
      return (format = data.map((tcc) => ({
        _id: tcc.id,

        title: tcc.title,
        summary: tcc.summary ? tcc.summary : null,
        grade: tcc.grade,

        status: tcc.status,

        document: tcc.document ? tcc.document : null,
        monography: tcc.monography ? tcc.monography : null,
        zip: tcc.zip ? tcc.zip : null,
        image: tcc.image ? tcc.image : null,

        supervisor: tcc.supervisor ? tcc.supervisor.name : null,
        supervisor_id: tcc.supervisor ? tcc.supervisor._id : null,

        group_id: tcc.group_id ? tcc.group_id._id : null,
        students: tcc.group_id ? tcc.group_id.students : null,

        course_id: tcc.course_id ? tcc.course_id._id : null,
        course_name: tcc.course_id ? tcc.course_id.name : null,

        date: new Date(tcc.date).getFullYear().toString(),
      })));
    })
    .then((resolve) => {

      if (resolve.length == 0) {
        const arr = {
          status: "SUCCESS",
          message: "O professor não possui nenhum TCC!",
        };
        return response.status(200).send(arr);
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
      return response.status(400).send(arr);
    });
};
