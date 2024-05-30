const Course = require('../../Model/Course');
const ModelJwtToken = require('../../Model/JwtToken');
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
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
    const name = request.body.name;

    const course = new Course(id , name);

    if(await course.exists() == null){
        const arr = {
            status: "ERROR",
            message: "Curso não existe"
        }
        return response.status(404).send(arr);
    }
   
    course.update()
        .then((resolve)=>{
            const arr = {
                status: "SUCESS",
                message: "Curso atualizado com sucesso",
                data: resolve
            }
            return response.status(200).send(arr);
        })
        .catch((reject)=>{
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao atualizar o curso",
                data: reject
            };
            return response.status(400).send(arr);
        })
}