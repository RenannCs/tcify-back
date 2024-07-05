const Tcc = require("../../Schemas/Tcc");
const { ObjectId } = require("mongodb");

module.exports = async (request, response) => {
  /*

    const database = new ModelDatabase();
    await database.conect();
    */

  const id = request.params.id;

  if ((await Tcc.exists({ _id: new ObjectId(id) }).exec()) == null) {
    const arr = {
      status: "ERROR",
      message: "Nenhum TCC encontrado!",
    };
    return response.status(404).send(arr);
  }

  Tcc.single(id)
    .then((tcc) => {
      return (dataFormat = {
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
      });
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
    const data = await tcc.allFields(fields);
    const format = data.map((tcc)=>({
      _id: tcc._id,
      title: tcc.title,
      summary: tcc.summary ? tcc.summary : null,
      grade: tcc.grade ? tcc.grade : null,
      supervisor: tcc.supervisor,
      supervisor_id: tcc.supervisor_id,
      date: new Date(tcc.date).getFullYear().toString(),
      status: tcc.status,
      students: tcc.students,
      course_id: tcc.course_id,
      course_name: tcc.course_name
    }))
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
