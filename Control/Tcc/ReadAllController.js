const ModelTcc = require('../../Model/TCCmongoose').tccModel
const ModelJwtToken = require('../../Model/JwtToken');

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

    const arrayData = [
        "_id" , "title" , "summary" , "grade" , "supervisor" , "date" , "status" , "files" , "group" , "course_id" , "course_name"
    ];
      
    ModelTcc.find().select(arrayData).exec()
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

    
};

module.exports = {
    read
};
