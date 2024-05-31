const ModelTcc = require("../../Model/Tcc");

module.exports = async (request, response) => {
  const tcc = new ModelTcc();

  const fields = [
    "_id",
    "title",
    "supervisor",
    "group",
    "course_id",
    "course_name",
    "date"
  ];

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
    });
};
