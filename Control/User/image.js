/**
 * controle de imagem
 * apaga e atualiza a imagem no banco de dados e nos arquivos
 */

const User = require("../../Schemas/User");
const imageSize = require("image-size");
const fs = require("fs");

const ModelJwtToken = require("../../Model/JwtToken");
const { ObjectId, BSON } = require("mongodb");

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

  const _id = request.params._id;
  const image = request.file;

  //Verifica se o usuário existe
  try {
    if ((await User.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não encontrado!",
      };
      return response.status(404).send(arr);
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Id inválido!",
      };
      return response.status(400).send(arr);
    } else {
      const arr = {
        status: "ERROR",
        message: "Erro do servidor, tente novamente mais tarde!",
        data: err,
      };
      return response.status(500).send(arr);
    }
  }

  if (!image) {
    const arr = {
      status: "ERROR",
      message: "Imagem não enviada!",
    };
    return response.status(400).send(arr);
  }

  const user = await User.findById(_id).exec();
  const caminhoAntigo = user.image;

  const mimetype = image.mimetype;
  const formatoAtual = mimetype.split("/")[1];
  const formatosImagens = ["jpg", "jpeg", "png", "webp"];

  //Verifica o formato da imagem
  if (!formatosImagens.includes(formatoAtual)) {
    //Apaga a imagem caso for invalida
    fs.unlink(image.path, (error) => {
      //Tratamento de erro caso não consiga excluir a image
      if (error) {
        const arr = {
          status: "ERROR",
          message: "Ocorreu um erro ao processar a imagem!",
          data: error,
        };
        return response.status(404).send(arr);
      }
    });

    //Erro caso a imagem for invalida
    const arr = {
      status: "ERROR",
      message: "Formato de imagem inválido!",
    };
    return response.status(415).send(arr);
  }

  const novoCaminho = "Uploads/UsersImages/" + _id + "." + formatoAtual;
  const tamanhoMax = 1024 * 1024 * 10; //10mb

  //Verifica o tamanho da imagem
  if (image.size > tamanhoMax) {
    //Exclui a imagem caso for muito grande
    fs.unlink(image.path, (error) => {
      //Tratamento de erro caso não consiga exlcuir a imagem
      if (error) {
        const arr = {
          status: "ERROR",
          message: "Ocorreu um erro ao processar a imagem!",
          data: error,
        };
        return response.status(404).send(arr);
      }
    });

    //Erro para a imagem grande
    const arr = {
      status: "ERROR",
      message: "Imagem muito grande!",
    };
    return response.status(413).send(arr);
  }

  const dimensions = await imageSize(image.path);
  const { width, height } = dimensions;

  //Verifica as dimensões da imagem
  if (width > 5000 || height > 5000) {
    //Exclui a imagem caso for invalida
    fs.unlink(image.path, (error) => {
      //Tratamento de erro para caso não consiga excluir a imagem
      if (error) {
        const arr = {
          status: "ERROR",
          message: "Ocorreu um erro ao processar a imagem!",
          data: error,
        };
        return response.status(404).send(arr);
      }
    });

    //Envia ao excluir imagem
    const arr = {
      status: "ERROR",
      message: "As dimensões da imagem são muito grandes!",
    };
    return response.status(413).send(arr);
  }

  //Verifica se o usuario possui imagem
  if (caminhoAntigo != null) {
    //Verifica se o caminho existe
    if (fs.existsSync(caminhoAntigo)) {
      //Exclui a imagem antiga
      fs.unlink(caminhoAntigo, (error) => {
        //Tratamento de erro para tentar exlcuir a imagem antiga
        if (error) {
          //Caso de erro, exclui a imagem atual para não houver conflito entre duas imagens
          fs.unlink(image.path, (error) => {
            //Tratamento de erro para excluir imagem atual
            if (error) {
              //Envia pelo erro da imagem nova
              const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao processar a imagem!",
                data: error,
              };
              return response.status(404).send(arr);
            }
          });

          //Envia pelo erro da imagem antiga
          const arr = {
            status: "ERROR",
            message: "Ocorreu um erro ao excluir a imagem antiga!",
            data: error,
          };
          return response.status(400).send(arr);
        }
      });
    }
  }

  //Renomeia a imagem nova
  fs.rename(image.path, novoCaminho, (error) => {
    //Tratamento de erro
    if (error) {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao substuir a imagem!",
        data: error,
      };
      return response.status(400).send(arr);
    }
  });

  user.image = novoCaminho;
  user
    .save()
    .then((resolve) => {
      resolve.image = `${process.env.API_PATH}${resolve.image}`;
      const arr = {
        status: "SUCCESS",
        message: "Imagem atualizada com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      fs.unlink(novoCaminho, (error) => {});
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o usuário!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
