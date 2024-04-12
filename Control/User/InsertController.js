const ModelDatabase = require('../../Model/DatabaseMongoose');
const ModelJwtToken = require('../../Model/JwtToken');

const ModelUser = require('../../Model/User');


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
    const database = new ModelDatabase();
    database.conect();
    const id = request.body.id;
    const name = request.body.name;
    const course_name = request.body.course_name;
    const course_id = request.body.course_id;
    const email = request.body.email;
    const password = request.body.password;
    const phone_number = request.body.phone_number;
    const github = request.body.github;
    const linkedin = request.body.linkedin;
    const user_type = request.body.user_type;
    const register = request.body.register;

    const user = new ModelUser(
        id,
        name,
        course_name,
        course_id,
        email,
        password,
        phone_number,
        github,
        linkedin,
        user_type,
        register
    );

    user.insert()
        .then((resolve) => {
            const arr = {
                data: resolve,
                status: 'SUCCESS',
                message: 'User created successfully.'
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

module.exports = insert;
