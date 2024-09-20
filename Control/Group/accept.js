const User = require("../../Schemas/User");
const Group = require("../../Schemas/Group");
const Tcc = require("../../Schemas/Tcc");
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let user_id;
  let group_id;

  try {
    user_id = request.body.user_id;
    group_id = request.body.group_id;
    if (!ObjectId.isValid(user_id) || !ObjectId.isValid(group_id)) {
      const arr = {
        status: "ERROR",
        message: "Dados inválidos!",
      };
      return response.status(400).send(arr);
    }

    const user = await User.findById(user_id);
    if (user == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não encontrado!",
      };
      return response.status(404).send(arr);
    }
    if (user.course_id != null) {
      const arr = {
        status: "ERROR",
        message: "Aluno já possui grupo!",
      };
      return response.status(409).send(arr);
    }

    const group = await Group.findById(group_id);
    if (group == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não encontrado!",
      };
      return response.status(404).send(arr);
    }

    let students = group.students;
    students.push(new ObjectId(user_id));
    group.students = students;

    user.group_id = group_id;
    user.save();

    const resp = await group.save();
    const data = await Group.single(group_id);
    Tcc.addNamesString(group.tcc_id);

    const arr = {
      status: "SUCCESS",
      message: "Usuário inserido no grupo com sucesso!",
      data: data,
    };

    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
