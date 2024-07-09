const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  Tcc.all()
    .then((data) => {
      const format = data.map((tcc) => ({
        _id: tcc.id,
        title: tcc.title,

        supervisor: tcc.supervisor ? tcc.supervisor.name : null,
        supervisor_id: tcc.supervisor ? tcc.supervisor._id : null,

        group_id: tcc.group_id ? tcc.group_id._id : null,
        students: tcc.group_id ? tcc.group_id.students : null,

        course_id: tcc.course_id ? tcc.course_id._id : null,
        course_name: tcc.course_id ? tcc.course_id.name : null,

        date: new Date(tcc.date).getFullYear().toString(),
      }));

      // let newFormat = [];
      // let newGroup;
      // for (const group of format) {
      //   if (group.students) {
      //     let newStudents = "";
      //     let first = true;
      //     for (const student of group.students) {
      //       if (!first) {
      //         newStudents += ", ";
      //       }
      //       newStudents += student.name;
      //       first = false;
      //     }
      //     newGroup = {
      //       _id: group._id,
      //       title: group.title,

      //       supervisor: group.supervisor ? group.supervisor : null,
      //       supervisor_id: group.supervisor_id ? group.supervisor_id : null,

      //       group_id: group.group_id ? group.group_id : null,
      //       students: newStudents,

      //       course_id: group.course_id ? group.course_id : null,
      //       course_name: group.course_name ? group.course_name : null,

      //       date: group.date,
      //     };
      //   }else{
      //     newGroup = {
      //       _id: group._id,
      //       title: group.title,

      //       supervisor: group.supervisor ? group.supervisor : null,
      //       supervisor_id: group.supervisor_id ? group.supervisor_id : null,

      //       group_id: group.group_id ? group.group_id : null,
      //       students: null,

      //       course_id: group.course_id ? group.course_id : null,
      //       course_name: group.course_name ? group.course_name : null,

      //       date: group.date,
      //     }
      //   }

      //   newFormat.push(newGroup);
      // }
      return format;
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        message: "TCC's recuperados com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch(() => {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao recuperar os TCC's!",
      };
      return response.status(400).send(arr);
    });

  /*

  try {
    const data = await tcc.allFields(fields);
    const format = data.map((tcc) => ({
      _id: tcc._id,
      title: tcc.title,
      supervisor: tcc.supervisor,
      supervisor_id: tcc.supervisor_id,
      students: tcc.students,
      course_id: tcc.course_id,
      course_name: tcc.course_name,
      date: new Date(tcc.date).getFullYear(), 
    }));
    const arr = {
      status: "SUCCESS",
      message: "TCC's recuperados com sucesso!",
      data: format,
    };
    return response.status(200).send(arr);
  } catch {
    const arr = {
      status: "ERROR",
      message: "Ocorreu um erro ao buscar os TCC's",
    };
    return response.status(400).send(arr);
  }



  /*
  tcc.allFields(fields)
      .then((resolve) => {
          const arr = {
            data: resolve,
            status: "SUCCESS",
        message: "TCCs successfully retrieved.",
      };
      response.status(200).send(arr);
    })
    .catch((reject) => {
      const arr = {
        data: reject,
        status: "ERROR",
        message:
          "An error occurred while processing your request. Please try again later.",
      };

      response.status(400).send(arr);
    });*/
};
