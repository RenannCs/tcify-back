const { ObjectId } = require("mongodb");
const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Schemas/User");
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

  const id = request.params.id;

  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;
  const phone_number = request.body.phone_number;
  const link = request.body.link;
  const linkedin = request.body.linkedin;
  const user_type = request.body.user_type;
  const enabled = request.body.enabled;
  const course_id = request.body.course_id;

  if ((await User.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Usuário não existe!",
    };
    return response.status(404).send(arr);
  }

  const user = await User.findById(id).exec();

  if (name != undefined) {
    user.name = name;
  }
  if (email != undefined) {
    user.email = email;
  }
  if (password != undefined) {
    user.password = password;
  }
  if (phone_number != undefined) {
    user.phone_number = phone_number;
  }

  if (link != undefined) {
    user.link = link;
  }
  if (linkedin != undefined) {
    user.linkedin = linkedin;
  }
  if (user_type != undefined) {
    user.user_type = user_type;
  }
  if (enabled != undefined) {
    user.enabled = enabled;
  }
  if(course_id != undefined){
    user.course_id = course_id;
  }

  user
    .save()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        data: resolve,
        message: "Usuario atualizado com sucesso",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        data: reject,
        message: "Ocorreu um erro ao atualizar o usuário!",
      };
      return response.status(200).send(arr);
    });
};
