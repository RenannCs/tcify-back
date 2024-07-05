const Tcc = require("../../Schemas/Tcc");

module.exports = async (request, response) => {
  Tcc.all()
    .then((data) => {
      return data.map((tcc) => ({
        _id: tcc.id,
        title: tcc.title,
        summary: tcc.summary,

        supervisor: tcc.supervisor.name,
        supervisor_id: tcc.supervisor._id,

        date: new Date(tcc.date).getFullYear().toString(),

        course_name: tcc.course_id.name,
        course_id: tcc.course_id._id,

        status: tcc.status,
        grade: tcc.grade,

        group_id: tcc.group_id._id,
        students: tcc.group_id.students,

        leader: tcc.group_id.leader_id.name,
        leader_id: tcc.group_id.leader_id._id,
      }));
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
  try{
      const data = await tcc.single();

      const format = {
        _id: data._id,
        title: data.title,
        summary: data.summary ? data.summary : null,
        grade: data.grade ? data.grade : null,
        supervisor: data.supervisor,
        supervisor_id: data.supervisor_id,
        date: new Date(data.date).getFullYear(), 
        status: data.status,
        students: data.students,
        course_id: data.course_id,
        course_name: data.course_name,
        document: data.document ? process.env.API_PATH + data.document : null,
        monography: data.monography ? process.env.API_PATH + data.monography : null,
        zip: data.zip ? process.env.API_PATH + data.zip : null,
        image: data.image ? data.image : "Default/tcc_image_default.png"
      };
      const arr = {
        status: "SUCCESS",
        message: "TCC's recuperados com sucesso!",
        data: format
      };
      return response.status(200).send(arr);
    }catch {
      const arr ={ 
        status: "ERROR",
        message: "Ocorreu um erro ao buscar os TCC's"
      };
      return response.status(400).send(arr);
    }*/
};
