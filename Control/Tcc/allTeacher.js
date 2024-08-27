const Tcc = require("../../Schemas/Tcc");
const { ObjectId } = require("mongodb");

module.exports = async (request, response) => {
  let _id;
  _id = request.params._id;
  
  Tcc.allFilter({ supervisor: _id })
    .then((resolve) => {
      if (resolve.length == 0) {
        const arr = {
          status: "ERROR",
          message: "O professor não possui nenhum projeto!",
        };
        return response.status(404).send(arr);
      }

      const arr = {
        status: "SUCCESS",
        message: "Projetos recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Erro de servidor, tente novamente mais tarde!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
