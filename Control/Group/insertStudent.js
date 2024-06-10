/**
 * Insere um aluno ao grupo
 */
const Group = require("../../Model/Group");
const User = require("../../Model/User");
const Email = require("../../Model/Email");
const ModelJwtToken = require('../../Model/JwtToken');
const JwtToken = new ModelJwtToken();

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

    if(await group.exists() == null){
        const arr = {
            status:"ERROR",
            message:"Grupo não existe!"
        };
        return response.status(404).send(arr);
    }
    if(await user.exists() == null){
        const arr = {
            status: "ERROR",
            message: "Aluno não existe!"
        }
        return response.status(404).send(arr);
    }
    if(await group.existByStudent(register) != null){
        const arr = {
            status: "ERROR",
            message: "Aluno já inserido em um grupo"
        }
        return response.status(400).send(arr);
    }

    const fields = ["name", "register", "course_name", "course_id" , "email", "phone_number", "github", "linkedin", "image"]
    const alunoData = await user.singleFieldsByRegister(fields);

    const email = new Email();
    email.dest = alunoData[0].email;
    email.subject = "Você foi adicionado a um grupo!";
    email.message = `
        <p> ${alunoData[0].name}, você foi adicionado a um grupo do Repositório de TCC's da Univap Centro!</p>
        <p> Para verificar o seu grupo, acesse o portal!</p>`
    email.title = "Adicionado a um grupo";
    email.send();

    const grupoData = await group.single();
    const arrAlunos = grupoData.students;
    arrAlunos.push(alunoData[0]);

    group.students = arrAlunos;
    
    group.update()
        .then((resolve)=>{
            const arr = {
                status: "SUCESS",
                message: "Aluno inserido com sucesso",
                data: resolve
            };
            return response.status(200).send(arr);
        })
        .catch((reject)=>{
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao inserir o aluno",
                data: reject
            };
            return response.status(400).send(arr);
        })
}