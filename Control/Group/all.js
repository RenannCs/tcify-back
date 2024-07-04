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

  /*
  Group.all()
    .then((resolve) => {
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
      return response.status(400).send(arr);
    });
  /*
    try{
        const data = await group.all();

        const format = data.map((group)=>({
            _id: group.id,
            students: group.students,
            leader: group.leaderName,
            leaderId: group.leaderId,
            status: group.status
        }));

        const arr = {
            status: "SUCCESS",
            message: "Grupos recuperados com sucesso!",
            data: format
        };
        return response.status(200).send(arr);
    }catch{
        const arr = {
            status: "ERROR",
            message: "Ocorreu um erro ao recuperar os grupos!",
        };
        return response.status(400).send(arr);
    }

    /*
    group.all()
        .then((resolve)=>{
            const arr = {
                status: "SUCCESS",
                message: "Grupos recuperados com sucesso!",
                data: resolve
            };
            return response.status(200).send(arr);
        })
        .catch((reject)=>{
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao recuperar os grupos!",
                data: reject
            };
            return response.status(400).send(arr);
        })*/
};
