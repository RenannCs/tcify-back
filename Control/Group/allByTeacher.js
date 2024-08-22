const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  const _id = request.params._id;

  Group.allFilter({ supervisor: _id })
    .then((data) => {
      if (data.length == 0) {
        return null;
      }
      return (format = data.map((group) => ({
        _id: group._id,

        title: group.title ? group.title : null,

        students: group.students,

        course_id: group.course_id ? group.course_id._id : null,
        course_name: group.course_id ? group.course_id.name : null,

        supervisor: group.supervisor ? group.supervisor.name : null,
        supervisor_id: group.supervisor ? group.supervisor._id : null,

        project: group.tcc_id ? group.tcc_id : null,

        leader: group.leader_id ? group.leader_id.name : null,
        leader_id: group.leader_id ? group.leader_id._id : null,

        status: group.status ? group.status : null,
      })));
    })
    .then((resolve) => {
      if (resolve == null) {
        const arr = {
          status: "ERROR",
          message: "Nenhum grupo encontrado!",
          data: null,
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
      if (reject.name == "CastError") {
        const arr = {
          status: "ERROR",
          message: "Professor inválido!",
        };
        return response.status(400).send(arr);
      }
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os grupos!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
