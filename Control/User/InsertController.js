const ModelDatabase = require('../../Model/Database');
const ModelJwtToken = require('../../Model/JwtToken');
const ModelAdmins = require('../../Model/User');

const Database = new ModelDatabase();
const Admin = new ModelAdmins(Database.connect());
const JwtToken = new ModelJwtToken();

const insert = function (request, response) {
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

    const data = request.body;

    Admin.insertOne(data)
        .then((resolve) => {
            const arr = {
                data: resolve,
                status: 'SUCCESS',
                message: 'User created successfully.'
            };
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                data: reject,
                status: 'ERROR',
                message: 'An error occurred while processing your request. Please try again later.'
            };
            response.status(400).send(arr);
        })
}

module.exports = {
    insert
}