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

    const id = request.params.id;
    

    const database = new ModelDatabase();
    await database.conect();

    const user = new ModelUser();
    user.id = id;

    const res = await user.exist();
    if(!res){
        database.desconnect();
        const arr = {
            status: "ERROR",
            message: "TCC não existe"
        }
        return response.status(404).send(arr);
    }

    /**
     * Fazer update de user
     */
    
}