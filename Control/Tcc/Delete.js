const Tcc = require("../../Schemas/Tcc");

const { ObjectId, BSON } = require("mongodb");
const fs = require("fs");
module.exports = async (request, response) => {
  let _id;
  let tcc;
  try {
    _id = request.params._id;
    tcc = await Tcc.single(_id);

    if (tcc == null) {
      const arr = {
        status: "ERROR",
        message: "Nenhum TCC foi encontrado!",
      };
      return response.status(404).send(arr);
    }

    if (tcc.monography != null) {
      if (fs.existsSync(tcc.monography)) {
        fs.unlink(tcc.monography, (error) => {});
      }
    }
    if (tcc.document != null) {
      if (fs.existsSync(tcc.document)) {
        fs.unlink(tcc.document, (error) => {});
      }
    }
    if (tcc.zip != null) {
      if (fs.existsSync(tcc.zip)) {
        fs.unlink(tcc.zip, (error) => {});
      }
    }
    if (tcc.image != null) {
      if (fs.existsSync(tcc.image)) {
        fs.unlink(tcc.image, (error) => {});
      }
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "TCC inválido!",
      };
      return response.status(400).send(arr);
    }
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  Tcc.deleteOne({ _id: new ObjectId(_id) })
    .exec()
    .then(() => {
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
        status: "SUCCESS",
        message: "TCC excluído com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao excluir o TCC!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
