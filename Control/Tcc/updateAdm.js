/**
 * Update de tcc
 * Pode alterar titulo, sumario
 */
const Tcc = require("../../Schemas/Tcc");
const User = require("../../Schemas/User");
const Course = require("../../Schemas/Course");
const Group = require("../../Schemas/Group");
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let tcc;

  let _id;

  let title;
  let summary;
  let grade;
  let status;
  let group_id;
  let course_id;
  let supervisor_id;
  try {
    _id = request.params._id;

    tcc = await Tcc.findById(_id).exec();

    if (tcc == null) {
      const arr = {
        status: "ERROR",
        message: "TCC não existe",
      };
      return response.status(404).send(arr);
    }

    title = request.body.title;
    summary = request.body.summary;
    grade = request.body.grade;
    status = request.body.status;
    group_id = request.body.group_id;
    course_id = request.body.course_id;
    supervisor_id = request.body.supervisor_id;

    if (title != undefined) {
      tcc.title = title;
    }
    if (summary != undefined) {
      tcc.summary = summary;
    }
    if (grade != undefined) {
      tcc.grade = grade;
    }
    if (status != undefined) {
      tcc.status = status;
    }
    if (group_id != undefined) {
      if (
        (await Group.exists({ _id: new ObjectId(group_id) }).exec()) == null
      ) {
        const arr = {
          status: "ERROR",
          message: "Grupo não existe!",
        };
        return response.status(404).send(arr);
      }
      tcc.group_id = group_id;
    }
    if (course_id != undefined) {
      if (
        (await Course.exists({ _id: new ObjectId(course_id) }).exec()) == null
      ) {
        const arr = {
          status: "ERROR",
          message: "Curso não existe!",
        };
        return response.status(404).send(arr);
      }
      tcc.course_id = course_id;
    }
    if (supervisor_id != undefined) {
      if (
        (await User.exists({
          $and: [
            { _id: new ObjectId(supervisor_id) },
            { user_type: "Professor" },
          ],
        }).exec()) == null
      ) {
        const arr = {
          status: "ERROR",
          message: "Supervisor não existe!",
        };
        return response.status(404).send(arr);
      }
      tcc.supervisor_id = supervisor_id;
    }
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  tcc
    .save()
    .then(async (data) => {
      return await Tcc.single(data.id);
    })
    .then((resolve) => {
      const arr = {
        data: resolve,
        status: "SUCCESS",
        message: "TCC atualizado com sucesso!",
      };
      response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        data: reject,
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o TCC!",
      };
      response.status(500).send(arr);
    });
};
