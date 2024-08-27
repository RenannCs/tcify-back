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
  let monography;
  let monography_path;
  let tcc;

  try {
  _id = request.params._id;
  monography = request.file;

  tcc = await Tcc.findById(_id).exec();

  if (tcc == null) {
    const arr = {
      status: "ERROR",
      message: "TCC não existe!",
    };
    return response.status(404).send(arr);
  }

  if (monography == undefined) {
    const arr = {
      status: "ERROR",
      message: "Nenhuma monografia foi enviada!",
    };
    return response.status(404).send(arr);
  }

  if (monography.size > 1024 * 1024 * 80) {
    fs.unlink(monography.path, (error) => {
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
      message: "Monografia muito grande!",
    };
    return response.status(413).send(arr);
  }

  const tipoDocumento = ["pdf", "docx"];
  const mimeDocumento = monography.mimetype;
  const tipoDocumentoAtual = mimeDocumento.split("/")[1];

  if (!tipoDocumento.includes(tipoDocumentoAtual)) {
    fs.unlink(monography.path, (error) => {
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
      message: "Tipo de monografia inválido",
    };
    return response.status(415).send(arr);
  }

  if (tcc.monography != null) {
    if (fs.existsSync(tcc.monography)) {
      fs.unlink(tcc.monography, (error) => {
        if (error) {
          fs.unlink(monography.path, (error) => {
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

  monography_path = "Uploads/Monographys/" + tcc.id + "." + tipoDocumentoAtual;
  tcc.monography = monography_path;

  fs.rename(monography.path, monography_path, (error) => {
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
    .then((data) => {
      return Tcc.single(data.id);
    })
    .then((tcc) => {
      return (dataFormat = {
        _id: tcc.id,

        title: tcc.title ? tcc.title : null,
        summary: tcc.summary ? tcc.summary : null,
        grade: tcc.grade ? tcc.grade : null,

        status: tcc.status ? tcc.status : null,

        document: tcc.document
          ? `${process.env.API_PATH}${tcc.document}`
          : null,

        monography: tcc.monography
          ? `${process.env.API_PATH}${tcc.monography}`
          : null,

        zip: tcc.zip ? `${process.env.API_PATH}${tcc.zip}` : null,

        image: tcc.image
          ? `${process.env.API_PATH}${tcc.image}`
          : `${process.env.API_PATH}${process.env.TCC_PICTURE_DEFAULT}`,

        supervisor: tcc.supervisor_id ? tcc.supervisor_id.name : null,
        supervisor_id: tcc.supervisor_id ? tcc.supervisor_id._id : null,

        group_id: tcc.group_id ? tcc.group_id._id : null,
        students: tcc.group_id ? tcc.group_id.students : null,

        course_id: tcc.course_id ? tcc.course_id._id : null,
        course: tcc.course_id ? tcc.course_id.name : null,

        date: new Date(tcc.date).getFullYear().toString(),
      });
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
      fs.unlink(monography_path, (error) => {});
      const arr = {
        data: reject,
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o TCC",
      };
      response.status(200).send(arr);
    });
};
