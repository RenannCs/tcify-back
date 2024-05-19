const ModelDatabase = require('../../Model/Database');
const ModelJwtToken = require('../../Model/JwtToken');
const ModelUser = require('../../Model/User');

const JwtToken = new ModelJwtToken();

module.exports = async (request, response) =>{
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
   
    const id = request.params.id
    const user =  new ModelUser(id);

    user.delete()
        .then((resolve) => {
            if(resolve == null){
                const arr = {
                    data: resolve,
                    status: 'ERROR',
                    message: 'No User found with the provided ID.'
                }
                return response.status(404).send(arr);
            }
            const arr = {
                data: resolve,
                status: 'SUCCESS',
                message: 'User successfully deleted.'
            }
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                dados: reject,
                status: 'ERROR',
                message: 'An error occurred while processing your request. Please try again later.'
            }
            response.status(400).send(arr);
        })
        /*
        .finally(()=>{
            database.desconnect();
        })*/
}