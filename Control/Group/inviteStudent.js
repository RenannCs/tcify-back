const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const Email = require("../../Model/Email");
module.exports = async (request, response) => {
  try {
    const _id = request.params._id;
    const students_register = request.body;

    const group = await Group.single(_id);

    if (group == null) {
      const arr = {
        status: "ERROR",
        message: "Grupo não encontrado!",
      };
      return response.status(404).send(arr);
    }

    let studentsString = "";
    let pri = true;
    for (let student of group.students) {
      if (pri) {
        studentsString += student.name;
        pri = false;
      } else {
        studentsString += ", " + student.name;
      }
    }

    for (let register of students_register) {
      let email = new Email();
      let student = await User.findOne({
        $and: [{ register: register }, { user_type: "Estudante" }],
      }).exec();

      let ver = await Group.existsByStudent(student._id);
      if (student != null && ver == null) {
        email.dest = student.email;
        email.subject = "Convite de grupo";
        email.message = `
      <br><p>Você foi convidado para participar de um grupo no Repositório de TCC's da Univap Centro!</p>
      <br>Dados do grupo:<br>
      Título: ${group.title}<br>
      Líder: ${group.leader}<br>
      Integrantes: ${studentsString}<br><br>
      Para aceitar, acesse: ${
        "http://localhost:5173/" +
        "authorization/group/" +
        group._id +
        "/user/" +
        student.id
      }
      `;
        email.send();
      }
    }

    const arr = {
        status: "SUCCESS",
        message: "Convites enviados com sucesso!"
    };
     return response.status(200).send(arr)
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };

    return response.status(500).send(arr);
  }
};
