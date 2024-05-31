const ModelJwtToken = require("../../Model/JwtToken");
const User = require("../../Model/User");

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
  const user = new User();
  user.id = id;

  if(await user.exists() == null){
    const arr = {
      status: "ERROR",
      message: "Usuário não existe!"
    };
    return response.status(404).send(arr)
  }

  user.delete()
    .then((resolve)=>{
      const arr = {
        status: "SUCESS",
        message: "Usário excluído com sucesso",
        data: resolve
      };
      return response.status(200).send(arr);
    })
    .catch((reject)=>{
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao tentar excluir o usuário!",
        data: reject
      };
      return response.status(400).send(arr);
    })
};
