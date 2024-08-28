const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  let query = {};

  const userLogged = request.userLogged;
  if (userLogged.user_type == "Professor") {
    query = { supervisor_id: userLogged._id };
  }

  Group.allFilter(query)
    .then((data) => {
      if (data == null) {
        return null;
      }
      return data.map((group) => ({
        _id: group._id,

        title: group.title,

        students: group.students,

        course_id: group.course_id ? group.course_id._id : null,
        course: group.course_id ? group.course_id.name : null,

        supervisor: group.supervisor_id ? group.supervisor_id.name : null,
        supervisor_id: group.supervisor_id ? group.supervisor_id._id : null,

        project: group.tcc_id ? group.tcc_id : null,

        leader: group.leader_id ? group.leader_id.name : null,
        leader_id: group.leader_id ? group.leader_id._id : null,

        status: group.status,
      }));
    })
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Nenhum grupo encontrado!",
        };
        return response.status(404).send(arr);
      }
      const arr = {
        status: "SUCCESS",
        message: "Grupos recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os grupos!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
