const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Email = require("../../Model/Email");
module.exports = async (request, response) => {
  try {
    const _id = request.params._id;
    const students_register = request.body;

    const group = await Group.findById(_id);

    if (group == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não encontrado!",
      };
      return response.status(404).send(arr);
    }
    let arrIds = [];
    for(let _student of students_register){
      let student = await User.findOne({register: _student}).exec();
      if(student != null && student.group_id == null){
        arrIds.push(student.id);
      }
        
    }
    Email.sendGroupInvites(group._id , arrIds);

    const arr = {
      status: "SUCCESS",
      message: "Convites enviados com sucesso!",
    };
    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };

    return response.status(500).send(arr);
  }
};
