const ModelJwtToken = require('../../Model/JwtToken');
const JwtToken = new ModelJwtToken();

const ModelGroup = require("../../Model/Group");
const ModelUser = require("../../Model/User");

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

    const group = new ModelGroup();

    const arrayStudentsRegister = request.body.students;
    const arrayStudentsData = [];
    
    for(const _student of arrayStudentsRegister){
        
        const student = new ModelUser();
        student.register = _student;

        if(await student.exist() == null){
            const arr = {
                status: "ERROR",
                msg: "Matrícula " + student.register + " não existe"
            }
            return response.status(404).send(arr);
        }
        
        const data = await student.singleFilterByRegister();
        
        if((await group.existByUserRegister(student.register)).length != 0){
            const arr = {
                status: "ERROR",
                msg: "Aluno " + data.name + " já adicionado a um grupo",
            }
            return response.status(400).send(arr);
        }

        arrayStudentsData.push(data)   
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

