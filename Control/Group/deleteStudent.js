const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Tcc = require("../../Schemas/Tcc");

const Email = require("../../Model/Email");

const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let _id;
  let register;
  try {
    _id = request.body._id;
    register = request.body.register;

    const group = await Group.findById(_id).exec();

    if (group == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não existe!",
      };
      return response.status(404).send(arr);
    }

    const student = await User.findOne({ register: register }).exec();

    if (student == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não existe!",
      };
      return response.status(404).send(arr);
    }

    if (group.students.length == 1 || group.leader_id == student.id) {
      try {
        if (group.tcc_id != null) {
          await Tcc.deleteOne({ _id: group.tcc_id }).exec();
        }

        await Group.deleteOne({ _id: group.id }).exec();
        const arr = {
          status: "SUCCESS",
          message: "Grupo e TCC excluídos!",
        };
        return response.status(200).send(arr);
      } catch {
        const arr = {
          status: "ERROR",
          message: "Ocorreu um erro ao excluir o grupo!",
        };
        return response.status(400).send(arr);
      }
    }

    if (!group.students.includes(student.id)) {
      const arr = {
        status: "ERROR",
        message: "Aluno não está nesse grupo!",
      };
      return response.status(400).send(arr);
    }
    let newStudents = [];
    for (let _student of group.students) {
      if (_student != student.id) {
        newStudents.push(_student);
      }
    }

    group.students = newStudents;

    await group.save();

    const data = await Group.single(group.id);

    const arr = {
      status: "SUCCESS",
      message: "Aluno excluído com sucesso!",
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
/*
  const email = new Email();
  email.dest = student.email;
  email.subject = "Você foi removido do grupo";
  email.title = "Você foi removido do seu grupo!";
  email.message = `
        <p> ${student.name}, você foi removido do seu grupo do Repositório de TCC's da Univap Centro!</p>`;

  email.send();
  */
