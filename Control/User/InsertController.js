const ModelDatabase = require("../../Model/Database");
const ModelJwtToken = require("../../Model/JwtToken");
const ModelUser = require("../../Model/User");
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
  const authorizationHeader = request.headers.authorization;
  const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

  if (tokenValidationResult.status !== true) {
    const arr = {
      status: "ERROR",
      message:
        "Invalid token! If the problem persists, please contact our technical support.",
      error: tokenValidationResult.error,
    };
    return response.status(401).send(arr);
  }
  /*
    const database = new ModelDatabase();
    await database.conect();
    */

  const name = request.body.name;
  const course_name = request.body.course_name;
  const course_id = request.body.course_id;
  const email = request.body.email;
  const password = request.body.password;
  const phone_number = request.body.phone_number;
  const github = request.body.github;
  const linkedin = request.body.linkedin;
  const user_type = request.body.user_type;
  const register = request.body.register;

  const user = new ModelUser(
    undefined,
    name,
    course_name,
    course_id,
    email,
    password,
    phone_number,
    github,
    linkedin,
    user_type,
    register
  );



  const resp = await user.exist();
  if (resp) {
    //database.desconnect();
    const arr = {
      status: "ERROR",
      message: "Registro ou email já em uso!",
    };
    return response.status(409).send(arr);
  }

  user
    .insert()
    .then((result) => {
      const arr = {
        data: result,
        status: "SUCCESS",
        message: "Usuário inserido com sucesso!",
      };
      response.status(200).send(arr);
    })
    .catch((error) => {
      const arr = {
        status: "ERROR",
        message: "Erro ao inserir usuário!",
        error: error.message,
      };
      response.status(400).send(arr);
    })
};
