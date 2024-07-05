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

  const document = request.files["document"];
  const dataTcc = await Tcc.findOne({ _id: new ObjectId(id) }).exec();
  const oldPath = dataTcc.document;

  fs.stat(document[0].path, (erro, data) => {
    if (erro) {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao ler o arquivo!",
      };
      return response.status(404).send(arr);
    }
    if (data.size > 1024 * 1024 * 10) {
      const arr = {
        status: "ERROR",
        message: "Arquivo muito grande!",
      };
      return response.status(413).send(arr);
    }
  });

  if (oldPath != undefined) {
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

  fs.rename(
    document[0].path,
    "Uploads/Documents/" + document[0].filename + ".pdf",
    (erro) => {
      if (erro) {
        const arr = {
          status: "ERROR",
          message: "Ocorreu um erro ao salvar o arquivo!",
        };
        return response.status(400).send(arr);
      }
    }
  );
  const tcc = await Tcc.findById(id).exec();
  tcc.document = "Uploads/Documents/" + document[0].filename + ".pdf";
  try {
    await tcc.save();
    const arr = {
      status: "SUCCESS",
      message: "Documento atualizada com sucesso!",
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
