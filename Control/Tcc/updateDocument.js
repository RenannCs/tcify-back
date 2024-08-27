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
  let document;
  let document_path;
  let tcc;

  try {
  _id = request.params._id;
  document = request.file;

  tcc = await Tcc.findById(_id).exec();

  if (tcc == null) {
    const arr = {
      status: "ERROR",
      message: "TCC não existe!",
    };
    return response.status(404).send(arr);
  }

  if (document == undefined) {
    const arr = {
      status: "ERROR",
      message: "Nenhum documento foi enviado!",
    };
    return response.status(404).send(arr);
  }

  if (document.size > 1024 * 1024 * 50) {
    fs.unlink(document.path, (error) => {
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
      message: "Documento muito grande!",
    };
    return response.status(413).send(arr);
  }

  const tipoDocumento = ["pdf", "docx"];
  const mimeDocumento = document.mimetype;
  const tipoDocumentoAtual = mimeDocumento.split("/")[1];

  if (!tipoDocumento.includes(tipoDocumentoAtual)) {
    fs.unlink(document.path, (error) => {
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
      message: "Tipo de documento inválido",
    };
    return response.status(415).send(arr);
  }

  if (tcc.document != null) {
    if (fs.existsSync(tcc.document)) {
      fs.unlink(tcc.document, (error) => {
        if (error) {
          fs.unlink(document.path, (error) => {
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

  document_path = "Uploads/Documents/" + tcc.id + "." + tipoDocumentoAtual;
  tcc.document = document_path;

  fs.rename(document.path, document_path, (error) => {
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
      fs.unlink(document_path, (error) => {});
      const arr = {
        data: reject,
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o TCC",
      };
      response.status(200).send(arr);
    });
};
