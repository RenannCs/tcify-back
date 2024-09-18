const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  const title = request.body.title;
  const students = request.body.students;
  
  Tcc.allPublic(title, students)
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
