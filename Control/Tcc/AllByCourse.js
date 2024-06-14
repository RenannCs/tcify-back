const Tcc = require('../../Model/Tcc');
const Course = require('../../Model/Course');
const { ObjectId } = require('mongodb');

module.exports = async (request, response) => {
    const id = request.params.id;

    const course = new Course();
    course.id = id;

    if(await course.exists() == null){
        const arr = {
            status: "ERROR",
            message: "Curso não existe!"
        };
        return response.status(404).send(arr);
    }

    const tcc = new Tcc();

    const fields = [
        "_id",
        "title",
        "summary",
        "grade",
        "supervisor",
        "date",
        "status",
        "group",
        "course_id"
      ];
    
    try{
        const data = await tcc.allFieldsFilter(fields , {"course_id": new ObjectId(id)});
        if(data.length == 0){
            const arr = {
                status: "SUCESS",
                message: "Não há TCC's para esse curso"
            }
            return response.status(404).send(arr);
        }
        const format = data.map((tcc)=>({
            _id: tcc._id,
            title: tcc.title,
            summary: tcc.summary ? tcc.summary : null,
            grade: tcc.grade ? tcc.grade : null,
            supervisor: tcc.supervisor.name,
            supervisor_id: tcc.supervisor._id,
            date: tcc.date,
            status: tcc.status,
            group: tcc.group.students,
            course_id: tcc.course_id._id,
            course_name: tcc.course_id.name
          }));
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