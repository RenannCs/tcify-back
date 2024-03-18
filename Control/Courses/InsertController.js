const ModelDatabase = require('../../Model/Database');
const ModelCourse = require('../../Model/Courses');
const ModelJwtToken = require('../../Model/JwtToken');

const Database = new ModelDatabase();
const Courses = new ModelCourse(Database.connect());
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

    Courses.insertOne(data)
        .then((resolve) => {
            const arr = {
                data: resolve,
                status: 'SUCCESS',
                message: 'Course inserted successfully.'
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
