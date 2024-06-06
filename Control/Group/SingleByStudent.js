/*
retornar todos os alunos e os dados dos usuarios
pesquisa feita pelo registro de usuario
*/
//const ModelJwtToken = require('../../Model/JwtToken');
//const JwtToken = new ModelJwtToken();

const Group = require("../../Model/Group");

module.exports = async(request , response)=>{
    /*const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== true) {
        const arr = {
            status: 'ERROR',
            message: 'Invalid token! If the problem persists, please contact our technical support.',
            error: tokenValidationResult.error
        };
        return response.status(401).send(arr);
    }*/

    const id = request.params.id;

    const group = new Group();
    
    group.findByStudent(id)
        .then((resolve)=>{
            if(resolve == null){
                const arr = {
                    status: "ERROR",
                    message: "Não existe grupo para esse usuário",
                    data: resolve
                }
                return response.status(404).send(arr);
            }
            const arr = {
                status: "SUCESS",
                message: "Grupo retornado com sucesso",
                data: resolve
            }
            return response.status(200).send(arr);
        })
        .catch((reject)=>{
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao buscar o grupo",
                data: reject
            }
            return response.status(400).send(arr);
        })
}