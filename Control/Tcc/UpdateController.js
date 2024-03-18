const ModelDatabase = require('../../Model/Database');
const ModelTCC = require('../../Model/Tccs');
const ModelJwtToken = require('../../Model/JwtToken');

const Database = new ModelDatabase();
const Tcc = new ModelTCC(Database.connect());
const JwtToken = new ModelJwtToken();

const update = function (request, response) {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== true) {
        const arr = {
            status: 'ERROR',
            message: 'Invalid token! If the problem persists, please contact our technical support.'
        };
        return response.status(401).send(arr);
    }
    
    const data = request.body;
    const id = request.params.id;

    Tcc.updateOne(id, data)
        .then((resolve) => {
            if (resolve.matchedCount == 1) {
                const arr = {
                    status: "SUCCESS",
                    data: resolve,
                    message: "TCC updated successfully."
                }
                response.status(200).send(arr);
            } else {
                const arr = {
                    status: "ERROR",
                    message: "No document was found with the provided ID."
                }
                response.status(404).send(arr);
            }
        })
        .catch((reject) => {
            const arr = {
                status: "ERROR",
                data: reject,
                message: "An error occurred while processing your request. Please try again later."
            };
            response.status(400).send(arr);
        })
}

module.exports = {
    update
}
