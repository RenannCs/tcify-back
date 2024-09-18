const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Email = require("../../Model/Email");
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
    
    const leader = await User.findById(leader_id).exec();

    if(leader == null){
      const arr = {
        status: "ERROR",
        message: "Líder não encontrado!"
      }
      return response.status(404).send(arr);
    }
    if (leader.group_id != null) {
      const arr = {
        status: "ERROR",
        message: "Líder já possui a um grupo!",
      };
      return response.status(409).send(arr);
    }

    for (let _student of students) {
      const student = await User.findById(_student).exec();

      if (student == null) {
        const arr = {
          status: "ERROR",
          message: "Um ou mais alunos não foram encontrados!",
        };
        return response.status(404).send(arr);
      }

      if (student.group_id != null) {
        const arr = {
          status: "ERROR",
          message: "Aluno " + student.name + " já adicionado a um grupo!",
        };
        return response.status(409).send(arr);
      }
    }

    group = new Group();
    group.title = title;
    group.students = students;
    group.leader_id = leader_id;
    group.course_id = course_id;
    group.supervisor_id = supervisor_id;
    group.status = "1";
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
      return data;
    })
    .then((resolve) => {

      User.addGroupIds(resolve._id , students);
      Email.sendGroupAdds(resolve._id , students);
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
