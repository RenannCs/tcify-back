/**
 * Faz update de título, sumário, nota, supervisor, data e curso.
 * 
 * --Adicionar controle para atualizar grupo, imagens e arquivos.
 */

const ModelTcc = require('../../Model/Tcc');
const ModelDatabase = require('../../Model/Database');
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

    /*
    const database = new ModelDatabase();
    await database.conect();
    */
    const tcc = new ModelTcc();
    tcc.id = id;
    const res = await tcc.exist()
    if (!res) {
        const arr = {
            status: "ERROR",
            message: "TCC não existe"
        }
        return response.status(404).send(arr);
    }


    const title = request.body.title;
    const summary = request.body.summary;
    const grade = request.body.grade;
    const supervisor = request.body.supervisor;
    const date = request.body.date;
    const course_id = request.body.course_id;
    const course_name = request.body.course_name;

    tcc.title = title;
    tcc.summary = summary;
    tcc.grade = grade;
    tcc.supervisor = supervisor;
    tcc.date = date;
    tcc.course_id = course_id;
    tcc.course_name = course_name;


    tcc.update()
        .then((resolve) => {
            const arr = {
                data: resolve,
                status: "SUCCESS",
                message: "TCC updated successfully."
            }
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                data: reject,
                status: "ERROR",
                message: "An error occurred while processing your request. Please try again later."
            };
            response.status(400).send(arr);
        })
        /*
        .finally(() => {
            database.desconnect();
        })*/

}