const ModelDatabase = require('../../Model/Database');
const ModelJwtToken = require('../../Model/JwtToken');
const ModelAdmins = require('../../Model/Admins');

const Database = new ModelDatabase();
const Admin = new ModelAdmins(Database.connect());
const JwtToken = new ModelJwtToken();

const read = function (request, response) {
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

    Admin.single(id)
        .then((resolve) => {
            if (resolve == null) {
                const arr = {
                    dados: resolve,
                    status: 'ERROR',
                    msg: 'No Administrator found with the provided ID.'
                };
                response.status(404).send(arr);
            } else {
                const arr = {
                    dados: resolve,
                    status: 'SUCESS',
                    msg: 'Administrator successfully recovered.'
                };
                response.status(200).send(arr);
            }
        })
        .catch((reject) => {
            const arr = {
                dados: reject,
                status: 'ERROR',
                msg: 'An error occurred while processing your request. Please try again later.'
            };
            response.status(400).send(arr);
        })
}

module.exports = {
    read
}