const User = require("../../Schemas/User");
const Group = require("../../Schemas/Group");

const { ObjectId } = require("mongodb");

module.exports = async (request, response) => {
  const userId = request.body.userId;
  const groupId = request.body.groupId;
  const accept = request.body.accept;

  if ((await User.exists({ _id: new ObjectId(userId) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Aluno não existe!",
    };
    return response.status(404).send(arr);
  }

  if ((await Group.exists({ _id: new ObjectId(groupId) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Grupo não encontrado!",
    };
    return response.status(404).send(arr);
  }
  if ((await Group.existsByStudent(userId)) != null) {
    const arr = {
      status: "ERROR",
      message: "Usuário já possui grupo!",
    };
    return response.status(404).send(arr);
  }

  if (accept) {
    const group = await Group.findById(groupId);
    let students = group.students;
    students.push(new ObjectId(userId));
    group.students = students;

    group
      .save()
      .then((resolve) => {
        const arr = {
          status: "SUCCESS",
          message: "Usuário inserido com sucesso!",
          data: resolve,
        };
        return response.status(200).send(arr);
      })
      .catch((reject) => {
        const arr = {
          status: "ERROR",
          message: "Ocorreu um erro ao inserir o usuário!",
          data: reject,
        };
        return response.status(404).send(arr);
      });
  } else {
    const arr = {
      status: "SUCCESS",
      message: "Usuário recusou o convite!",
    };
    return response.status(200).send(arr);
  }
};
