const ModelTcc = require("../../Model/Tcc");

module.exports = async (request, response) => {
  const tcc = new ModelTcc();

  const fields = [
    "_id",
    "title",
    "supervisor",
    "students",
    "course_id",
    "course_name",
    "date",
    "status",
    "grade",
    "supervisor_id"
  ];

  try {
    const data = await tcc.allFields(fields);
    const format = data.map((tcc) => ({
      _id: tcc._id,
      _id: tcc._id,
      title: tcc.title,
      supervisor: tcc.supervisor,
      supervisor_id: tcc.supervisor_id,
      studensts: tcc.students,
      course_id: tcc.course_id,
      course_name: tcc.course_name,
      date: new Date(tcc.date).getFullYear(), 
      status: tcc.status,
      grade: tcc.grade
    }));
    const arr = {
      status: "SUCCESS",
      message: "TCC's recuperados com sucesso!",
      data: format,
    };
    return response.status(200).send(arr);
  } catch {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao buscar os TCC's",
    };
    return response.status(400).send(arr);
  }
  /*
  tcc.allFields(fields)
      .then((resolve) => {
          const arr = {
            data: resolve,
            status: "SUCCESS",
        message: "TCCs successfully retrieved.",
      };
      response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        data: reject,
        status: "ERROR",
        message:
          "An error occurred while processing your request. Please try again later.",
      };

      response.status(400).send(arr);
    });*/
};
