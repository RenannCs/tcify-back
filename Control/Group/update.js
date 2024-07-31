const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Tcc = require("../../Schemas/Tcc");
const Course = require("../../Schemas/Course");

const { ObjectId } = require("mongodb");
module.exports = async (request, response) => {
  let group;

  let _id;
  let title;
  let course_id;
  let supervisor_id;
  let tcc_id;
  let status;
  try {
    _id = request.params._id;

    if ((await Group.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não existe!",
      };
      return response.status(404).send(arr);
    }

    group = await Group.findById(_id).exec();

    title = request.body.title;
    course_id = request.body.course_id;
    supervisor_id = request.body.supervisor_id;
    tcc_id = request.body.tcc_id;
    status = request.body.status;

    if (title != undefined) {
      group.title = title;
    }

    if (status != undefined) {
      group.status = status;
    }

    if (course_id != undefined) {
      if ((await Course.exists({ _id: course_id }).exec()) == null) {
        const arr = {
          status: "ERROR",
          message: "Curso não existe!",
        };
        return response.status(404).send(arr);
      }
      group.course_id = course_id;
    }
    if (supervisor_id != undefined) {
      if (
        (await User.exists({
          $and: [{ _id: supervisor_id }, { user_type: "Professor" }],
        }).exec()) == null
      ) {
        const arr = {
          status: "ERROR",
          message: "supervisor_id não existe!",
        };
        return response.status(404).send(arr);
      }
      group.supervisor_id = supervisor_id;
    }

    if (tcc_id != undefined) {
      if ((await Tcc.exists({ _id: tcc_id }).exec()) == null) {
        const arr = {
          status: "ERROR",
          message: "Tcc não existe!",
        };
        return response.status(404).send(arr);
      }
      group.tcc_id = tcc_id;
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
      return (format = {
        _id: data._id,

        title: data.title ? data.title : null,

        students: data.students,

        course_id: data.course_id ? data.course_id._id : null,
        course_name: data.course_id ? data.course_id.name : null,

        supervisor_id: data.supervisor_id ? data.supervisor_id.name : null,
        supervisor_id_id: data.supervisor_id ? data.supervisor._id : null,

        tcc: data.tcc_id ? data.tcc_id : null,

        leader: data.leader_id ? data.leader_id.name : null,
        leader_id: data.leader_id ? data.leader_id._id : null,

        status: data.status ? data.status : null,
      });
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo atualizado com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o grupo!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
