const ModelDatabase = require('../../Model/Database');
const ModelJwtToken = require('../../Model/JwtToken');
const ModelAdmins = require('../../Model/Admins');

const Database = new ModelDatabase();
const Admin = new ModelAdmins(Database.connect());
const JwtToken = new ModelJwtToken();

const insert = function (request, response) {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== "VALID") {
        const arr = {
            status: "ERROR",
            message: "Invalid token! Please check your authorization token and try again."
        };
        return response.status(401).send(arr);
    }

    const data = request.body;

    if (!(Admin.verifyJsonInsert(data))){
        const arr = {
            status: "ERROR",
            message: "Invalid Json format !"
        }
        return response.status(400).send(arr);
    }

    Admin.insertOne(data)
        .then((resolve) => {
            const arr = {
                status: "SUCCESS",
                data: resolve,
                message: "TCC inserted successfully."
            };
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                status: "ERROR",
                data: reject,
                message: "An error occurred while processing your request. Please try again later."
            };
            response.status(400).send(arr);
        })
}

module.exports = {
    insert
}