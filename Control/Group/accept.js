const User = require('../../Model/User');
const Group = require('../../Model/Group');


module.exports = async (request , response) =>{
    const userId = request.body.userId;
    const groupId = request.body.groupId;
    const accept = request.body.accept;

    const student = new User();
    student.id = userId;
    
    if (await student.exists() == null){
        const arr = {
            status: "ERROR",
            message: "Aluno não existe!"
        };
        return response.status(404).send(arr);
    }

    const group = new Group();
    group.id = groupId;

    if (await group.exists() == null){
        const arr = {
            status: "ERROR",
            message: "Grupo não encontrado!"
        };
        return response.status(404).send(arr);
    }
    if(await group.findByStudentId(student.id) != null){
        const arr = {
            status: "ERROR",
            message: "Usuário já possui grupo!"
        };
        return response.status(404).send(arr);
    }

    if(accept){
        const fields = ["name", "register", "course_name", "course_id" , "email", "phone_number", "github", "linkedin", "image"];
        const studentData = await student.singleFields(fields);
        
        const grupoData = await group.single();
        
        const arrAlunos = grupoData.students;
        arrAlunos.push(studentData);

        group.students = arrAlunos;
        group.update()
            .then((resolve)=>{
                const arr = {
                    status: "SUCESS",
                    message: "Usuário inserido com sucesso!",
                    data: resolve
                };
                return response.status(200).send(arr);
            })
            .catch((reject)=>{
                const arr = {
                    status: "ERROR",
                    message: "Ocorreu um erro ao inserir o usuário!",
                    data: reject
                };
                return response.status(404).send(arr);
            })
    }else{
        const arr = {
            status: "SUCESS",
            message: "Usuário recusou o convite!"
        };
        return response.status(200).send(arr);
    }
}