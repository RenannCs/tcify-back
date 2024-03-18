const ModelDatabase = require('../../Model/Database');
const ModelJwtToken = require('../../Model/JwtToken');
const ModelAdmins = require('../../Model/Admins');

const Database = new ModelDatabase();
const Admin = new ModelAdmins(Database.connect());
const JwtToken = new ModelJwtToken();

const remove = function (request, response) {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== true) {
        const arr = {
            status: 'ERROR',
            message: 'Invalid token! If the problem persists, please contact our technical support.'
        };
        return response.status(401).send(arr);
    }

    const id = request.params.id

    Admin.deleteOne(id)
        .then((resolve) => {
            if (resolve.deletedCount == 1) {
                const arr = {
                    status: 'SUCCESS',
                    data: resolve,
                    message: 'Administrator successfully deleted.'
                };
                response.status(200).send(arr);
            } else {
                const arr = {
                    status: 'ERROR',
                    data: resolve,
                    message: 'No Administrator found with the provided ID.'
                }
                response.status(404).send(arr);
            }
        })
        .catch((reject) => {
            const arr = {
                status: 'ERROR',
                dados: reject,
                message: 'An error occurred while processing your request. Please try again later.'
            }
            response.status(400).send(arr);
        })
}

module.exports = {
    remove
}