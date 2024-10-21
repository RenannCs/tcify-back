
const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Tcc = require("../../Schemas/Tcc");
module.exports = async (request, response) => {
  const group_id = request.params.group_id;
  const student_id = request.body.student_id;


  try {
    const group = await Group.findById(group_id).exec();
    if (group == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não existe!",
      };
      return response.status(404).send(arr);
    }

    const student = await User.findById(student_id).exec();
    if (student == null) {
      const arr = {
        status: "ERROR",
        message: "Aluno não existe!",
      };
      return response.status(404).send(arr);
    }

    student.group_id = undefined;
    await student.save();

    let students = group.students;
    if (group.leader_id == student.id || group.students.length == 1) {
      await User.removeGroupIds(group.students);
      await Group.deleteOne({ _id: group_id }).exec();
      if (group.tcc_id) {
        await Tcc.deleteOne({ _id: group.tcc_id }).exec();
      }
      const arr = {
        status: "SUCCESS",
        message: "Grupo excluído com sucesso!",
      };
      return response.status(200).send(arr);
    }
    let newStudents = [];

    for (let _student of students) {
      if (_student != student.id) {
        newStudents.push(_student);
      }
    }
    group.students = newStudents;

    await group.save();

    const aux_group = await Group.single(group_id);
    const arr = {
      status: "SUCCESS",
      message: "Aluno removido com sucesso!",
      data: aux_group,
    };
    return response.status(200).send(arr);
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      error: error,
    };
    return response.status(500).send(arr);
  }
};
