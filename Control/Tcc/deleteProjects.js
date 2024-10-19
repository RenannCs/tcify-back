const Tcc = require("../../Schemas/Tcc");
const Group = require("../../Schemas/Group");
const fs = require("fs");
module.exports = async (request, response) => {
  try {
    const _id_list = request.body;

    let deletedCount = 0;
    let tccsExcluidos = [];

    for (let _id of _id_list) {
      try {
        let tcc = await Tcc.single(_id);
        if (tcc == null) {
          continue;
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

        const resp = await Tcc.findByIdAndDelete(_id).exec();
        await Group.updateOne({ _id: tcc.group_id }, { tcc_id: null }).exec();
        if (resp != 1) {
          deletedCount += 1;
          tccsExcluidos.push(tcc);
        }
      } catch (error) {
        const arr = {
          status: "ERROR",
          message: "Erro de servidor, tente novamente mais tarde!",
          data: error,
        };
        return response.status(500).send(arr);
      }
    }

    const data = {
      deletedCount: deletedCount,
      tccsExcluidos: tccsExcluidos,
    };

    const arr = {
      status: "SUCCESS",
      message: "TCC's excluídos!",
      data: data,
    };

    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
