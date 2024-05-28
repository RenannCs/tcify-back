const ModelJwtToken = require('../../Model/JwtToken');
const JwtToken = new ModelJwtToken();

const ModelGroup = require("../../Model/Group");
const { typeHandlers } = require('image-size/dist/types');

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

    const id = request.params.id;

    const group = new ModelGroup();
    group.id = id;

    if(await group.single() == null){
        const arr = {
            status: "ERROR",
            message: "Grupo não existe!"
        }
        return response.status(404).send(arr);
    }

    group.delete()
        .then((resolve)=>{
            const arr = {
                status: "SUCESS",
                message: "Grupo excluído com sucesso!",
                data: resolve
            }
            return response.status(200).send(arr);
        })
        .catch((reject)=>{
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao excluir o grupo",
                data: reject
            }
            return response.status(400).send(arr);
        })
}