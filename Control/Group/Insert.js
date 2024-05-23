const ModelJwtToken = require('../../Model/JwtToken');
const JwtToken = new ModelJwtToken();

const ModelGroup = require("../../Model/Group");
const ModelUser = require("../../Model/User");

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

    const group = new ModelGroup();

    const student1Id = request.body.student1;
    const student2Id = request.body.student2;
    const student3Id = request.body.student3;

    const student1 = new ModelUser();
    student1.register = student1Id;

    const student2 = new ModelUser()
    student2.register = student2Id;

    const student3 = new ModelUser();
    student3.register = student3Id;
    
    if(await student1.exist()){
        //console.log(group.existByUserRegister());
        const student1Data = await student1.singleFilterByRegister();
        group.student1 = student1Data;
    }

    if(await student2.exist()){
        const student2Data = await student2.singleFilterByRegister();
        group.student2 = student2Data;
    }

    if(await student3.exist()){
        const student3Data = await student3.singleFilterByRegister();
        group.student3 = student3Data;
    }

    

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

