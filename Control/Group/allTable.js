const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  try {
    const data = await Group.all();
    const dataFormat = data.map((group) => ({
      _id: group._id,
      title: group.title ? group.title : null,
      leader: group.leader_id ? group.leader_id.name : null,
      leader_id: group.leader_id ? group.leader_id._id : null,
      students: group.students,
      course_id: group.course_id ? group.course_id._id : null,
      course_name: group.course_id ? group.course_id.name : null,
      supervisor: group.supervisor ? group.supervisor.name : null,
      supervisor_id: group.supervisor ? group.supervisor._id : null,
      tcc: group.tcc_id ? group.tcc_id : null,
      status: group.status ? group.status : null,
    }));
    const arr = {
      status: "SUCCESS",
      message: "Grupos recuperados com sucesso!",
      data: dataFormat,
    };
    return response.status(200).send(arr);
  } catch (err) {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao buscar os grupos!",
      data: err,
    };
    return response.status(400).send(arr);
  }
};
