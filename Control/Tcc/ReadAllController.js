const ModelDatabase = require('../../Model/Database');
const ModelTCC = require('../../Model/Tccs');
const ModelJwtToken = require('../../Model/JwtToken');

const Database = new ModelDatabase();
const Tcc = new ModelTCC(Database.connect());
const JwtToken = new ModelJwtToken();

const read = function (request, response) {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== true) {
        const arr = {
            status: 'ERROR',
            message: 'Invalid token! If the problem persists, please contact our technical support.'
        };
        return response.status(401).send(arr);
    }

    Tcc.readAll()
        .then((resolve) => {
            const arr = {
                status: 'SUCCESS',
                data: resolve,
                message: 'TCCs successfully retrieved.'
            };
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                status: 'ERROR',
                data: reject,
                message: 'An error occurred while fetching data.'
            };
            response.status(400).send(arr);
        });
};

module.exports = {
    read
};
