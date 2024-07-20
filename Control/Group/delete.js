const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
const { ObjectId, BSON } = require("mongodb");
const Group = require("../../Schemas/Group");
const Tcc = require("../../Schemas/Tcc");
const User = require("../../Schemas/User");
/**
 * DELETAR O TCC JUNTO
 */

module.exports = async (request, response) => {
  let _id;
  let group;
  try {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    const token_id = tokenValidationResult.decoded.payload._id;
    const token_user_type = tokenValidationResult.decoded.payload.user_type;
    const token_status = tokenValidationResult.status;

    if (token_status) {
      if (
        (await User.validateTokenId(token_id)) == false ||
        User.validatePermission(token_user_type) == false
      ) {
        const arr = {
          status: "ERROR",
          message: "Operação negada devido as permissões do usuário!",
        };
        return response.status(403).send(arr);
      }
    } else {
      const arr = {
        status: "ERROR",
        message: "Token de validação inválido!",
      };
      return response.status(403).send(arr);
    }

    _id = request.params._id;

    if ((await Group.exists({ _id: new ObjectId(_id) })) == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não existe!",
      };
      return response.status(404).send(arr);
    }

    group = await Group.single(_id);
  
    if (group.tcc_id != null) {
      await Tcc.deleteOne({ _id: group.tcc_id._id }).exec();
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Grupo inválido!",
      };
      return response.status(400).send(arr);
    }
    const arr = {
      status: "ERROR",
      mesasge: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  Group.findByIdAndDelete(_id)
    .exec()
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo excluído com sucesso!",
        data: group,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao excluir o grupo!",
        date: reject,
      };
      return response.status(400).send(arr);
    });
};
