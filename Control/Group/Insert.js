const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Course = require("../../Schemas/Course");
const Email = require("../../Model/Email");
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let group;

  let students;
  let leader_id;
  let supervisor_id;
  let title;
  let course_id;

  try {
    students = request.body.students;
    leader_id = request.body.leader_id;
    supervisor_id = request.body.supervisor_id;
    title = request.body.title;
    course_id = request.body.course_id;

    if ((await Group.existsByStudent(leader_id)) != null) {
      const arr = {
        status: "ERROR",
        message: "Líder já possui grupo!",
      };
      return response.status(409).send(arr);
    }

    for (let _student of students) {
      if ((await User.exists({ _id: _student }).exec()) == null) {
        const arr = {
          status: "ERROR",
          message: "Um ou mais alunos não foram encontrados!",
        };
        return response.status(404).send(arr);
      }

      const student = await User.findOne({ _id: _student }).exec();
      if ((await Group.existsByStudent(student.id)) != null) {
        const arr = {
          status: "ERROR",
          message: "Aluno " + student.name + " já adicionado a um grupo!",
        };
        return response.status(409).send(arr);
      }
    }

    group = new Group();
    group.title = title;
    group.students = [leader_id];
    group.leader_id = leader_id;
    group.course_id = course_id;
    group.supervisor_id = supervisor_id;
    group.status = "0";
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  group
    .save()
    .then(async (group) => {
      const data = await Group.single(group.id);
      return {
        _id: data._id,

        title: data.title,

        students: data.students,

        course_id: data.course_id ? data.course_id._id : null,
        course_name: data.course_id ? data.course_id.name : null,

        supervisor: data.supervisor_id ? data.supervisor_id.name : null,
        supervisor_id: data.supervisor_id ? data.supervisor_id._id : null,

        tcc: data.tcc_id ? data.tcc_id : null,

        leader: data.leader_id ? data.leader_id.name : null,
        leader_id: data.leader_id ? data.leader_id._id : null,

        status: data.status,
      };
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo inserido com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      if (reject.errors) {
        if (reject.errors.supervisor_id) {
          const arr = {
            status: "ERROR",
            message: "Professor não encontrado!",
          };
          return response.status(404).send(arr);
        }
        if (reject.errors.leader_id) {
          const arr = {
            status: "ERROR",
            message: "Líder não encontrado!",
          };
          return response.status(404).send(arr);
        }
        if (reject.errors.course_id) {
          const arr = {
            status: "ERROR",
            message: "Curso não encontrado!",
          };
          return response.status(404).send(arr);
        }
      }
      const arr = {
        status: "ERROR",
        message: "Erro de servidor, tente novamente mais tarde!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
/*
  for (const _student of students) {
    const student = await User.findOne({ register: _student });

    if (_student != leader_id) {
      const email = new Email();
      email.dest = student.email;
      email.subject = "Convite para grupo";
      email.message = `
        <p> ${student.name}, você foi convidado para participar do grupo de ${
        leaderData.name
      } 
        do Repositório de TCC's da Univap Centro!</p>
        <p> Para aceitar o grupo, acesse o ${
          "http://localhost:5173/" +
          "authorization/group/" +
          novoGrupo.id +
          "/user/" +
          student.id
        }!</p>`;
      email.title = "Você foi convidado para um grupo!";
      email.send();
    }
  }*/
