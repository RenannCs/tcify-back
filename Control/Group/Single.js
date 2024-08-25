/*
single do grupo por _id
*/
const { ObjectId, BSON } = require("mongodb");
const Group = require("../../Schemas/Group");

module.exports = async (request, response) => {
  let _id;
  try {
    _id = request.params._id;

    if ((await Group.exists({ _id: new ObjectId(_id) }).exec()) == null) {
      const arr = {
        status: "ERROR",
        message: "Nenhum grupo encontrado!",
      };
      return response.status(404).send(arr);
    }
  } catch (error) {
    if (error instanceof BSON.BSONError) {
      const arr = {
        status: "ERROR",
        message: "Groupo inválido!",
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

  Group.single(_id)
    .then((data)=>{
      return format = {
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
      }
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "Grupo retornado com sucesso",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao buscar o grupo",
        data: reject,
      };
      return response.status(400).send(arr);
    });
};
