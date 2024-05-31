/**
 * Update de tcc
 * Pode alterar titulo, sumario , nota e status
 */
const Tcc = require('../../Model/Tcc');

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

    const tcc = new Tcc();
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
    const status = request.body.status;

    tcc.title = title;
    tcc.summary = summary;
    tcc.grade = grade;
    tcc.status = status;

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
}