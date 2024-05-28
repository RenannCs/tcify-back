const ModelDatabase = require("../../Model/Database");
const ModelJwtToken = require("../../Model/JwtToken");
const ModelUser = require("../../Model/User");

const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  /*
    const database = new ModelDatabase();
    await database.conect();
    */
  const id = request.params.id;
  const user = new ModelUser(id);

  const fields = [
    "register",
    "email",
    "_id",
    "name",
    "course_name",
    "github",
    "linkedin",
    "phone_number",
    "user_type",
    "image"
  ];

  user
    .single(fields)
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          dados: resolve,
          status: "ERROR",
          message: "Nenhum dado encontrado!",
        };
        response.status(404).send(arr);
      } else {
        const arr = {
          data: resolve,
          status: "SUCESS",
          message: 'Dados recuperados com sucesso!'
        };
        response.status(200).send(arr);
      }
    })
    .catch((reject) => {
      const arr = {
        data: reject,
        status: "ERROR",
        message: "Erro ao recuperar dados!",
      };
      response.status(400).send(arr);
    });
  /*
        .finally(()=>{
            database.desconnect();
        })
        */
};
