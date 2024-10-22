/**
 * Update de tcc
 * Pode alterar titulo, sumario
 */
const Tcc = require("../../Schemas/Tcc");
const Group = require("../../Schemas/Group");
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let tcc;

  let title;
  let summary;
  try {
    const _id = request.params._id;
    tcc = await Tcc.findById(_id).exec();

    if (tcc == null) {
      const arr = {
        status: "ERROR",
        message: "TCC não existe",
      };
      return response.status(404).send(arr);
    }

    title = request.body.title;
    summary = request.body.summary;

    if (title) {
      tcc.title = title;
    }
    if (summary) {
      tcc.summary = summary;
    }
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
      const aux = await Tcc.single(data);

      return aux;
    })
    .then((resolve) => {
      const arr = {
        data: resolve,
        status: "SUCCESS",
        message: "Projeto atualizado com sucesso!",
      };
      response.status(200).send(arr);
    })
    .then(async () => {
      if (title) {
        await Group.updateOne({ _id: tcc.group_id }, { title: title }).exec();
      }
    })
    .catch((reject) => {
      const arr = {
        data: reject,
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o TCC!",
      };
      response.status(500).send(arr);
    });
};
