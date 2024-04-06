const ModelTcc = require('../../Model/TCCmongoose').tccModel;
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

    const year = request.params.year

    const arrayData = [
        "_id" , "title" , "summary" , "grade" , "supervisor" , "date" , "status" , "files" , "group" , "course_id" , "course_name"
    ];

    ModelTcc.where("date").equals(year).select(arrayData).exec()
        .then((resolve) => {
            if (resolve && resolve.length > 0) {
                const arr = {
                    data: resolve,
                    status: "SUCCESS",
                    message: "TCCs successfully retrieved."
                };
                response.status(200).send(arr);
            } else {
                const arr = {
                    data: resolve,
                    status: "SUCCESS",
                    message: "No TCCs in the requested year."
                };
                response.status(200).send(arr);
            }
        })
        .catch((reject) => {
            const arr = {
                status: "ERROR",
                data: reject,
                message: "An error occurred while processing your request. Please try again later."
            };
            response.status(400).send(arr);
        });

};

module.exports = {
    read
};
