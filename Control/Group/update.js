const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Tcc = require("../../Schemas/Tcc");
const { ObjectId } = require("mongodb");
// const Tcc = require("../../Schemas/Tcc");
// const Course = require("../../Schemas/Course");

// const { ObjectId } = require("mongodb");
module.exports = async (request, response) => {
  let group;

  let _id;
  let title;
  let course_id;
  let supervisor_id;
  let tcc_id;
  let status;
  let students;
  let leader_id;
  let students_antigo;
  try {
    _id = request.params._id;

    group = await Group.findById(_id).exec();

    if (group == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não existe!",
      };
      return response.status(404).send(arr);
    }

    title = request.body.title;
    course_id = request.body.course_id;
    supervisor_id = request.body.supervisor_id;
    tcc_id = request.body.tcc_id;
    status = request.body.status;
    students = request.body.students;
    leader_id = request.body.leader_id;

    if (title != undefined) {
      group.title = title;
    }

    if (status != undefined) {
      group.status = status;
    }

    if (course_id != undefined) {
      // if ((await Course.exists({ _id: course_id }).exec()) == null) {
      //   const arr = {
      //     status: "ERROR",
      //     message: "Curso não existe!",
      //   };
      //   return response.status(404).send(arr);
      // }
      group.course_id = course_id;
    }
    if (supervisor_id != undefined) {
      // if (
      //   (await User.exists({
      //     $and: [{ _id: supervisor_id }, { user_type: "Professor" }],
      //   }).exec()) == null
      // ) {
      //   const arr = {
      //     status: "ERROR",
      //     message: "Supervisor não existe!",
      //   };
      //   return response.status(404).send(arr);
      // }
      group.supervisor_id = supervisor_id;
    }

    if (tcc_id != undefined) {
      // if ((await Tcc.exists({ _id: tcc_id }).exec()) == null) {
      //   const arr = {
      //     status: "ERROR",
      //     message: "Tcc não existe!",
      //   };
      //   return response.status(404).send(arr);
      // }
      group.tcc_id = tcc_id;
    }

    if (students != undefined) {
      for (let student_id of students) {
        if (!ObjectId.isValid(student_id)) {
          const arr = {
            status: "ERROR",
            message: "Um ou mais alunos não existe!",
          };
          return response.status(404).send(arr);
        }

        let student = await User.findById(student_id).exec();
        if (student == null) {
          const arr = {
            status: "ERROR",
            message: "Um ou mais alunos não existe!",
          };
          return response.status(404).send(arr);
        }
        if (student.group_id != null && student.group_id != group.id) {
          const arr = {
            status: "ERROR",
            message: `Aluno ${student.name} já possui grupo!`,
          };
          return response.status(409).send(arr);
        }
      }
      students_antigo = group.students;
      group.students = students;
    }

    if (leader_id != undefined) {
      group.leader_id = leader_id;
    }
  } catch (error) {
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
      return data;
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo atualizado com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .then(async () => {
      await User.removeGroupIds(students_antigo);
      await User.addGroupIds(_id, students);
      await Tcc.addNamesString(group.tcc_id);
    })
    .catch((reject) => {
      if (reject.errors) {
        if (reject.errors.supervisor_id) {
          const arr = {
            status: "ERROR",
            message: "Professor não encontrado!",
            data: reject,
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
        if (reject.errors.tcc_id) {
          const arr = {
            status: "ERROR",
            message: "TCC não encontrado!",
            data: reject,
          };
          return response.status(404).send(arr);
        }
      }
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o grupo!",
        data: reject,
      };
      return response.status(500).send(arr);
    })
    
};
