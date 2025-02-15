/**
 * CONTROLE DE IMAGEM.
 *
 * Pode fazer a inserção de uma imagem nova ou atualizar
 * uma já existente. Altera também no Banco de Dados.
 */

const Tcc = require("../../Schemas/Tcc");

const fs = require("fs");

module.exports = async (request, response) => {
  let _id;
  let image;
  let image_path;
  let tcc;

  try {
    _id = request.params._id;
    image = request.file;

    tcc = await Tcc.findById(_id).exec();

    if (tcc == null) {
      const arr = {
        status: "ERROR",
        message: "TCC não existe!",
      };
      return response.status(404).send(arr);
    }

    if (image == undefined) {
      const arr = {
        status: "ERROR",
        message: "Nenhuma imagem foi enviada!",
      };
      return response.status(404).send(arr);
    }

    if (image.size > 1024 * 1024 * 20) {
      fs.unlink(image.path, (error) => {
        if (error) {
          const arr = {
            status: "ERROR",
            message: "Ocorreu um erro ao ler o arquivo!",
            data: error,
          };
          return response.status(500).send(arr);
        }
      });
      const arr = {
        status: "ERROR",
        message: "Imagem muito grande!",
      };
      return response.status(413).send(arr);
    }

    const tipoImagem = ["png", "jpg", "jpeg", "webp"];
    const mimeImagem = image.mimetype;
    const tipoImagemAtual = mimeImagem.split("/")[1];

    if (!tipoImagem.includes(tipoImagemAtual)) {
      fs.unlink(image.path, (error) => {
        if (error) {
          const arr = {
            status: "ERROR",
            message: "Ocorreu um erro ao ler o arquivo!",
            data: error,
          };
          return response.status(500).send(arr);
        }
      });
      const arr = {
        status: "ERROR",
        message: "Tipo de imagem inválido",
      };
      return response.status(415).send(arr);
    }

    if (tcc.image != null) {
      if (fs.existsSync(tcc.image)) {
        fs.unlink(tcc.image, (error) => {
          if (error) {
            fs.unlink(image.path, (error) => {
              if (error) {
                const arr = {
                  status: "ERROR",
                  message: "Ocorreu um erro ao ler o arquivo!",
                  data: error,
                };
                return response.status(500).send(arr);
              }
            });

            const arr = {
              status: "ERROR",
              message: "Ocorreu um erro ao ler o arquivo!",
              data: error,
            };
            return response.status(500).send(arr);
          }
        });
      }
    }

    image_path = "Uploads/TccsImages/" + tcc.id + "." + tipoImagemAtual;
    tcc.image = image_path;

    fs.rename(image.path, image_path, (error) => {
      if (error) {
        const arr = {
          status: "ERROR",
          message: "Ocorreu um erro ao ler o arquivo!",
          data: error,
        };
        return response.status(500).send(arr);
      }
    });
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  tcc
    .save()
    .then(async (data) => {
      return await Tcc.single(data.id);
    })
    .then((resolve) => {
      const arr = {
        data: resolve,
        status: "SUCCESS",
        message: "Projeto atualizado com sucesso!",
      };
      response.status(200).send(arr);
    })
    .catch((reject) => {
      fs.unlink(image_path, (error) => {});
      const arr = {
        data: reject,
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o TCC",
      };
      response.status(200).send(arr);
    });
};
