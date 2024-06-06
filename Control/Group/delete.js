const ModelJwtToken = require('../../Model/JwtToken');
const JwtToken = new ModelJwtToken();

const Group = require("../../Model/Group");
const Tcc = require("../../Model/TCC");
const Email = require('../../Model/Email');
/**
 * DELETAR O TCC JUNTO
 */

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

    const group = new Group();
    const tcc = new Tcc();

    group.id = id;

    const dataGroup = await group.single();
    if(dataGroup == null){
        const arr = {
            status: "ERROR",
            message: "Grupo não existe!"
        }
        return response.status(404).send(arr);
    }
    
    const idTcc = await tcc.existsByGroupId(group.id);

    if(idTcc){
        tcc.id = idTcc._id;
        try{
            await tcc.delete();
        }catch{
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao excluir o Tcc, grupo não excluído!"
            };
            return response.status(400).send(arr);
        }
    }


    group.delete()
        .then((resolve)=>{
            for(const student of dataGroup.students){
                const email = new Email();
                email.dest = student.email;
                email.subject = "Grupo excluído";
                email.title = "Seu grupo foi excluído!";
                email.message = `
                <p> ${student.name}, seu grupo foi excluído do repositório de TCC's da Univap Centro!</p>`;
                email.send();
            }
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