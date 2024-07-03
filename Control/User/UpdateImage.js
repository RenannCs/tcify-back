/**
 * controle de imagem
 * apaga e atualiza a imagem no banco de dados e nos arquivos
 */

const User = require("../../Schemas/User");
const imageSize = require("image-size");
const fs = require("fs");

const ModelJwtToken = require("../../Model/JwtToken");
const { ObjectId } = require("mongodb");
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

  if ((await User.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Usuário não encontrado!",
    };
    return response.status(404).send(arr);
  }

  const user = await User.findById(id).exec();

  const caminhoAntigo = user.image;

  const novoCaminho = "Uploads/UsersImages/" + id + ".jpg";

  const tamanhoMax = 1024 * 1024 * 10;
  const image = request.files["image"];

  if (image[0].size > tamanhoMax) {
    const arr = {
      status: "ERROR",
      message: "Imagem muito grande!",
    };
    return response.status(413).send(arr);
  }

  if (image == undefined) {
    const arr = {
      status: "ERROR",
      message: "Imagem não foi encontrada!",
    };
    return response.status(404).send(arr);
  }

  const imagePath = image[0].path;

  const dimensions = await imageSize(imagePath);
  const { width, height } = dimensions;

  if (width > 5000 || height > 5000) {
    //database.desconnect();
    const arr = {
      status: "ERROR",
      message: "As dimensões da imagem são muito grandes!",
    };
    return response.status(413).send(arr);
  }

  try {
    if (caminhoAntigo != null) {
      fs.unlink(caminhoAntigo, (error) => {});
    }
    fs.rename(image[0].path, novoCaminho, (error) => {});
    user.image = novoCaminho;

    await user.save();

    const arr = {
      status: "SUCESS",
      message: "Imagem atualizada com sucesso",
    };
    return response.status(200).send(arr);
  } catch {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao procesar a imagem!",
    };
    return response.status(400).send(arr);
  }
};
