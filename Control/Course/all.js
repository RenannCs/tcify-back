const Course = require('../../Model/Course');

module.exports = async (request, response) => {
    const course = new Course();
    
    course.all()
        .then((resolve)=>{
            const arr={
                status: "SUCESS",
                message: "Cursos retornados com sucesso",
                data: resolve
            }
            return response.status(200).send(arr);
        })
        .catch((reject)=>{
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao buscar os cursos",
                data: reject
            };
            return response.staus(400).send(arr);
        })
};