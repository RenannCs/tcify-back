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

    if ((await User.exists({ _id: leader_id }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Matrícula " + leader_id + " não existe!",
      };
      return response.status(404).send(arr);
    }

    const leaderData = await User.findOne({ _id: leader_id }).exec();

    if ((await Group.existsByStudent(leaderData.id)) != null) {
      const arr = {
        status: "ERROR",
        message: "Você já possuí grupo!",
      };
      return response.status(409).send(arr);
    }

    if (
      (await Course.exists({ _id: new ObjectId(course_id) }).exec()) == null
    ) {
      const arr = {
        status: "ERROR",
        message: "Curso não existe!",
      };
      return response.status(404).send(arr);
    }
    if (
      (await User.exists({
        $and: [{ _id: supervisor_id }, { user_type: "Professor" }],
      }).exec()) == null
    ) {
      const arr = {
        status: "ERROR",
        message: "Orientador não existe!",
      };
      return response.status(404).send(arr);
    }
    for (const _student of students) {
      if ((await User.exists({ _id: _student }).exec()) == null) {
        const arr = {
          status: "ERROR",
          message: "Matrícula " + _student + " não existe!",
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
    group.students = [leaderData.id];
    group.leader_id = leaderData.id;
    group.course_id = course_id;
    group.supervisor = supervisor_id;
    group.status = "0";
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Curso inválido!",
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
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo inserido com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao inserir o grupo!",
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
