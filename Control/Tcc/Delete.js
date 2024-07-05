const Tcc = require("../../Schemas/Tcc");
const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();

const { ObjectId } = require("mongodb");

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

  if ((await Tcc.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Nenhum TCC foi encontrado!",
    };
    return response.status(404).send(arr);
  }

  Tcc.deleteOne({ _id: new ObjectId(id) })
    .exec()
    .then(() => {
      const arr = {
        status: "SUCCESS",
        message: "TCC excluído com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch(() => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao excluir o TCC!",
      };
      return response.status(400).send(arr);
    });

  /*
    tcc.delete()
        .then((resolve) => {
            if(resolve == null){
                const arr = {
                    data: resolve,
                    status: 'ERROR',
                    message: 'No TCC found with the provided ID.'
                }
                return response.status(404).send(arr);
            }
            const arr = {
                data: resolve,
                status: 'SUCCESS',
                message: 'Projeto deletado com sucesso!'
            }
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                status: 'ERROR',
                data: reject,
                message: 'An error occurred while processing your request. Please try again later.'
            }
            response.status(400).send(arr);
        })
        /*.finally(()=>{
            database.desconnect();
        })*/
};
