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
  let zip;
  let zip_path;
  let tcc;

  try {
    _id = request.params._id;
    zip = request.file;

    tcc = await Tcc.findById(_id).exec();

    if (tcc == null) {
      const arr = {
        status: "ERROR",
        message: "TCC não existe!",
      };
      return response.status(404).send(arr);
    }

    if (zip == undefined) {
      const arr = {
        status: "ERROR",
        message: "Nenhum arquivo foi enviado!",
      };
      return response.status(404).send(arr);
    }

    if (zip.size > 1024 * 1024 * 200) {
      fs.unlink(zip.path, (error) => {
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
        message: "Arquivo muito grande!",
      };
      return response.status(413).send(arr);
    }

    const mimeDocumento = zip.mimetype;
    const tipoDocumentoAtual = mimeDocumento.split("/")[1];

    console.log(tipoDocumentoAtual);

    const tiposAceitos = ["zip", "jar", "apk", "x-zip-compressed"];

    if (!tiposAceitos.includes(tipoDocumentoAtual)) {
      fs.unlink(zip.path, (error) => {
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
        message: "Tipo de arquivo inválido",
      };
      return response.status(415).send(arr);
    }

    // Continue com o processamento do arquivo

    if (tcc.zip != null) {
      if (fs.existsSync(tcc.zip)) {
        fs.unlink(tcc.zip, (error) => {
          if (error) {
            fs.unlink(zip.path, (error) => {
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

    zip_path = "Uploads/Zips/" + tcc.id + "." + "zip";
    tcc.zip = zip_path;

    fs.rename(zip.path, zip_path, (error) => {
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
        message: "TCC atualizado com sucesso!",
      };
      response.status(200).send(arr);
    })
    .catch((reject) => {
      fs.unlink(zip_path, (error) => {});
      const arr = {
        data: reject,
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o TCC",
      };
      response.status(200).send(arr);
    });
};
