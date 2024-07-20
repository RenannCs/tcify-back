const User = require("../../Schemas/User");
const Group = require("../../Schemas/Group");

const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let user_id;
  let group_id;
  let accept;

  try {
    accept = request.body.accept;

    if (accept == false) {
      const arr = {
        status: "SUCCESS",
        message: "Usuário recusou o convite!",
      };
      return response.status(200).send(arr);
    }
    user_id = request.body.user_id;
    group_id = request.body.group_id;

    if ((await User.exists({ _id: new ObjectId(user_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Aluno não existe!",
      };
      return response.status(404).send(arr);
    }

    if ((await Group.exists({ _id: new ObjectId(group_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não encontrado!",
      };
      return response.status(404).send(arr);
    }
    if ((await Group.existsByStudent(user_id)) != null) {
      const arr = {
        status: "ERROR",
        message: "Usuário já possui grupo!",
      };
      return response.status(404).send(arr);
    }

    if (accept == true) {
      const group = await Group.findById(group_id);
      let students = group.students;
      students.push(new ObjectId(user_id));
      group.students = students;

      const resp = await group.save();
      const arr = {
        status: "SUCCESS",
        message: "Usuário inserido no grupo com sucesso!",
        data: resp,
      };
      return response.status(200).send(arr);
    } else {
      const arr = {
        status: "ERROR",
        message: "Código de verificação inválido!",
      };
      return response.status(400).send(arr);
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Usuário inválido!",
      };
      return response.status(400).send(arr);
    }
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
