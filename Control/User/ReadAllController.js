const ModelJwtToken = require('../../Model/JwtToken');
const ModelUser = require('../../Model/User');
const ModelDatabase = require('../../Model/DatabaseMongoose');

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
    
    const database = new ModelDatabase();
    database.conect();

    const user = new ModelUser();
    
    user.readAll()
        .then((resolve) => {
            const arr = {
                dados: resolve,
                status: 'SUCESS',
                message: 'User successfully recovered.'
            }
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                dados: reject,
                status: 'ERROR',
                message: 'An error occurred while processing your request. Please try again later.'
            };
            response.status(400).send(arr);
        })
}

module.exports = read;
