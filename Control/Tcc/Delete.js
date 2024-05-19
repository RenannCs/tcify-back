const ModelTcc = require('../../Model/Tcc');
const ModelJwtToken = require('../../Model/JwtToken');
const ModelDatabase = require('../../Model/Database');
const JwtToken = new ModelJwtToken();


module.exports = async  (request, response) => {
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
    const tcc = new ModelTcc(id);

    tcc.delete()
        .then((resolve) => {
            if(resolve == null){
                const arr = {
                    data: resolve,
                    status: 'ERROR',
                    message: 'No TCC found with the provided ID.'
                }
                return response.status(404).send(arr);
            }
            const arr = {
                data: resolve,
                status: 'SUCCESS',
                message: 'TCC successfully deleted.'
            }
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                status: 'ERROR',
                data: reject,
                message: 'An error occurred while processing your request. Please try again later.'
            }
            response.status(400).send(arr);
        })
        /*.finally(()=>{
            database.desconnect();
        })*/
}


