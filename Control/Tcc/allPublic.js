const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  const page = request.body.page;
  const title = request.body.title;
  const students = request.body.students;
  const date = request.body.date;
  const course_id = request.body.course_id;
  const supervisor_id = request.body.supervisor_id;

  Tcc.allPublic(title, students, date, course_id, supervisor_id, 10, page)
    /*.then((data) => {
      let newTcss
      for(let tcc of data){

      }
    })*/
    .then((resolve) => {
      const arr = {
        count: resolve.length,
        status: "SUCCESS",
        message: "Projetos recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os projetos!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
