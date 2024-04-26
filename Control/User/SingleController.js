const ModelDatabase = require('../../Model/Database');
const ModelJwtToken = require('../../Model/JwtToken');
const ModelUser = require('../../Model/User');

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

    /*
    const database = new ModelDatabase();
    await database.conect();
    */
    const id = request.params.id;
    const user = new ModelUser(id);

    user.single(id)
        .then((resolve) => {
            if (resolve == null) {
                const arr = {
                    dados: resolve,
                    status: 'ERROR',
                    msg: 'No user found with the provided ID.'
                };
                response.status(404).send(arr);
            } else {
                const arr = {
                    dados: resolve,
                    status: 'SUCESS',
                    msg: 'User successfully recovered.'
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
        /*
        .finally(()=>{
            database.desconnect();
        })
        */
}
