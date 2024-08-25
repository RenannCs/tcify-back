/**
 * Insere um aluno ao grupo
 */
const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Email = require("../../Model/Email");

const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let _id;
  let register;
  let user;
  let group;

  try {
    _id = request.body._id;
    register = request.body.register;

    group = await Group.findById(_id).exec();
    if (group == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não existe!",
      };
      return response.status(404).send(arr);
    }

    user = await User.findOne({ register: register }).exec();
    if (user == null) {
      const arr = {
        status: "ERROR",
        message: "Aluno não existe!",
      };
      return response.status(404).send(arr);
    }

    if ((await Group.existsByStudent(user.id)) != null) {
      const arr = {
        status: "ERROR",
        message: "Aluno já inserido em um grupo",
      };
      return response.status(409).send(arr);
    }

    let newStudents = group.students;
    newStudents.push(user.id);

    group.students = newStudents;
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
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  group
    .save()
    .then(async (group) => {
      const data = await Group.single(group.id);
      return (format = {
        _id: data._id,

        title: data.title ? data.title : null,

        students: data.students,

        course_id: data.course_id ? data.course_id._id : null,
        course_name: data.course_id ? data.course_id.name : null,

        supervisor: data.supervisor_id ? data.supervisor_id.name : null,
        supervisor_id: data.supervisor_id ? data.supervisor_id._id : null,

        project: data.tcc_id ? data.tcc_id : null,

        leader: data.leader_id ? data.leader_id.name : null,
        leader_id: data.leader_id ? data.leader_id._id : null,

        status: data.status ? data.status : null,
      });
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Aluno inserido com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao inserir o aluno",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
/*
  const email = new Email();
  email.dest = user.email;
  email.subject = "Você foi adicionado a um grupo!";
  email.message = `
        <p> ${user.name}, você foi adicionado a um grupo do Repositório de TCC's da Univap Centro!</p>
        <p> Para verificar o seu grupo, acesse o portal!</p>`;
  email.title = "Adicionado a um grupo";
  email.send();
  */
