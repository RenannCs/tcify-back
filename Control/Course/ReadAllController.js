const ModelDatabase = require('../../Model/DatabaseAntigo');
const ModelCourse = require('../../Model/Course');
const ModelJwtToken = require('../../Model/JwtToken');

const Database = new ModelDatabase();
const Course = new ModelCourse(Database.connect());
const JwtToken = new ModelJwtToken();

const read = function (request, response) {
    Course.readAll()
        .then((resolve) => {
            const arr = {
                data: resolve,
                status: 'SUCCESS',
                message: 'Courses successfully retrieved.'
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
        });
};

module.exports = read;
