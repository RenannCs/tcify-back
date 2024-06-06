const ModelJwtToken = require('../../Model/JwtToken');
const JwtToken = new ModelJwtToken();

const Group = require("../../Model/Group");
const User = require("../../Model/User");
const Email = require("../../Model/Email");

module.exports =  async (request , response)=>{
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

    const group = new Group();

    const arrayStudentsRegister = request.body.students;
    const arrayStudentsData = [];
    
    for(const _student of arrayStudentsRegister){
        
        const student = new User();
        student.register = _student;

        if(await student.exists() == null){
            const arr = {
                status: "ERROR",
                message: "Matrícula " + student.register + " não existe"
            }
            return response.status(404).send(arr);
        }

        if((await group.existByStudent(student.register)) != null){
            const arr = {
                status: "ERROR",
                message: "Aluno " + student.register + " já adicionado a um grupo",
            }
            return response.status(400).send(arr);
        }

        const arrayData = ["name", "register", "course_name", "course_id" , "email", "phone_number", "github", "linkedin", "image"];
        const data = await student.singleFieldsByRegister(arrayData);
        arrayStudentsData.push(data[0]);
        
        const email = new Email();
        email.dest = data[0].email;
        email.subject = "Você foi adicionado a um grupo!"
        email.message = `
        <p> ${data[0].name}, você foi adicionado a um grupo do Repositório de TCC's da Univap Centro!</p>
        <p> Para verificar o seu grupo, acesse o portal!</p>`
        email.title = "Adicionado a um grupo";
        email.send();
    }
    
    group.students = arrayStudentsData;

    group.insert()
        .then((resolve)=>{
            const arr = {
                status: "SUCESS",
                message: "Grupo inserido com sucesso",
                data: resolve
            }
            return response.status(200).send(arr);
        })
        .catch((reject)=>{
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao inserir o grupo",
                data: reject
            }
            return response.status(400).send(arr);
        })
}

