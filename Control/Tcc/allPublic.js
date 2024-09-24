const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  const page = request.query.page;
  const title = request.query.title;
  const students = request.query.students;
  const date = request.query.date;
  const course_id = request.query.course_id;
  const supervisor_id = request.query.supervisor_id;

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
