const Tcc = require("../../Schemas/Tcc");
const Group = require("../../Schemas/Group");
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
        message: "Nenhum projeto foi encontrado!",
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
    const group = await Group.findById(tcc.group_id);
    console.log(group);
    group.tcc_id = undefined;
    await group.save();
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  Tcc.findByIdAndDelete(_id)
    .exec()
    .then(async (resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Projeto excluído com sucesso!",
        data: tcc,
      };

      //Group.updateOne({ _id: tcc.group_id }, { tcc_id: undefined }).exec();

      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Erro de servidor, tente novamente mais tarde!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
