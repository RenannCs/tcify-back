const Tcc = require('../../Model/TCC');


module.exports = async (request, response) =>{
    /*
    if (tokenValidationResult.status !== true) {
        const arr = {
            status: 'ERROR',
            message: 'Invalid token! If the problem persists, please contact our technical support.',
            error: tokenValidationResult.error
        };
        return response.status(401).send(arr);
    }*/
    /*

    const database = new ModelDatabase();
    await database.conect();
    */
    const tcc = new Tcc();
      
    tcc.readAll()
    .then((resolve)=>{
        const arr = {
            data: resolve,
            status: 'SUCCESS',
            message: 'TCCs successfully retrieved.'
        };
        
        response.status(200).send(arr);
    })
    .catch((reject)=>{
        const arr = {
            data: reject,
            status: 'ERROR',
            message: 'An error occurred while processing your request. Please try again later.'
        };
        
        response.status(400).send(arr);
    })
    /*
    .finally(()=>{
        database.desconnect();
    })*/
    
};
