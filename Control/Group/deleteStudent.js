const Group = require('../../Model/Group');
const User = require('../../Model/User');
const Email = require('../../Model/Email');
const Tcc = require('../../Model/TCC');
const ModelJwtToken = require('../../Model/JwtToken');
const JwtToken = new ModelJwtToken();
const { ObjectId } = require('mongodb');

module.exports = async (request , response)=>{
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== true) {
        const arr = {
            status: 'ERROR',
            message: 'Invalid token! If the problem persists, please contact our technical support.',
            error: tokenValidationResult.error
        };
        return response.status(401).send(arr);
    }

    const id = request.body.id;
    const register = request.body.register;

    const group = new Group();
    group.id = id;
    const user = new User();
    user.register = register;

    const groupData = await group.single();
    if(groupData == null){
        const arr = {
            status: "ERROR",
            message: "Grupo não encontrado!"
        };
        return response.staus(404).send(arr);
    }
    const userId = await user.exists();
    if(userId == null){
        const arr = {
            status: "ERROR",
            message: "Usuário não encontrado!"
        };
        return response.status(404).send(arr);
    }
    const students = groupData.students;
    let newStudents = [];
    let ver = false;
    for(const student of students){
        if(student.register != register){
            newStudents.push(student);
        }else{
            ver = true;
        }
    }
    if(!ver){
        const arr = {
            status: "ERROR",
            message: "Aluno não está nesse grupo!"
        };
        return response.status(400).send(arr);
    }

    user.id = userId._id;
    const studentData = await user.single();
    const email = new Email();
    email.dest = studentData.email;
    email.subject = "Você foi removido do grupo";
    email.title = "Você foi removido do seu grupo!";
    email.message = `
        <p> ${studentData.name}, você foi removido do seu grupo do Repositório de TCC's da Univap Centro!</p>`;
    
    email.send();


    
    const tcc = new Tcc();
    const dataTcc = await tcc.singleFilter({"group_id": new ObjectId(id)});
    if(dataTcc != null){
        const idTcc = dataTcc[0].id;
        tcc.id = idTcc;
        tcc.students = newStudents;
        tcc.update();
    }

    group.students = newStudents;

    group.update()
        .then((resolve)=>{
            const arr = {
                status:"SUCESS",
                message: "Aluno excluído com sucesso!",
                data: resolve
            };
            return response.status(200).send(arr);
        })
        .catch((reject)=>{
            const arr =  {
                status: "ERROR",
                message: "Ocorreu um erro ao excluir o aluno!",
                data: reject
            };
            return response.status(400).send(arr);
        })
}