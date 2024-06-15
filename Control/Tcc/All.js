const Tcc = require("../../Model/Tcc");

module.exports = async (request, response) => {
  /*

    const database = new ModelDatabase();
    await database.conect();
    */
  const tcc = new Tcc();
  
  const fields = [
    "_id",
    "title",
    "summary",
    "grade",
    "supervisor",
    "supervisor_id",
    "date",
    "status",
    "group",
    "course_id",
    "course_name"
  ];

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
      group: tcc.group,
      course_id: tcc.course_id,
      course_name: tcc.course_name
    }))
    const arr = {
      status: "SUCESS",
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
  }
}
