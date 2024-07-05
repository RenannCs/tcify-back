const Tcc = require("../../Schemas/Tcc");
const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
const fs = require("fs");

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
      message: "TCC não existe!",
    };
    return response.status(404).send(arr);
  }

  const zip = request.files["zip"];
  const dataTcc = await Tcc.findById(id).exec();
  const oldPath = dataTcc.zip;

  fs.stat(zip[0].path, (erro, data) => {
    if (erro) {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao ler o arquivo!",
      };
      return response.status(404).send(arr);
    }
    if (data.size > 1024 * 1024 * 50) {
      const arr = {
        status: "ERROR",
        message: "Arquivo muito grande!",
      };
      return response.status(413).send(arr);
    }
  });

  if (oldPath) {
    fs.unlink(oldPath, (erro) => {
      if (erro) {
        const arr = {
          status: "ERROR",
          message: "Ocorreu um erro ao excluir arquivo antigo!",
        };
        return response.status(400).send(arr);
      }
    });
  }

  fs.rename(zip[0].path, "Uploads/Zips/" + zip[0].filename + ".zip", (erro) => {
    if (erro) {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao salvar o arquivo!",
      };
      return response.status(400).send(arr);
    }
  });
  const tcc = await Tcc.findById(id).exec();
  tcc.zip = "Uploads/Zips/" + zip[0].filename + ".zip";
  try {
    await tcc.save();
    const arr = {
      status: "SUCCESS",
      message: "Zip atualizado com sucesso!",
    };
    return response.status(200).send(arr);
  } catch {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao atualizar o Tcc!",
    };
    return response.status(400).send(arr);
  }
};
