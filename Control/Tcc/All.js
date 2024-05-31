const Tcc = require("../../Model/Tcc");

module.exports = async (request, response) => {
  /*

    const database = new ModelDatabase();
    await database.conect();
    */
  const tcc = new Tcc();
  
  const fields = [
    "_id",
    "title",
    "summary",
    "grade",
    "supervisor",
    "date",
    "status",
    "group",
    "course_id",
    "course_name",
  ];

  tcc
    .allFieldsFilter(fields , {"status": 2})
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
    });
  /*
    .finally(()=>{
        database.desconnect();
    })*/
};
