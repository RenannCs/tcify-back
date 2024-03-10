const ModelDatabase = require('../../Model/Database');
const ModelTCC = require('../../Model/Tccs');
const ModelJwtToken = require('../../Model/JwtToken');

const Database = new ModelDatabase();
const Tcc = new ModelTCC(Database.connect());
const JwtToken = new ModelJwtToken();

const read = function (request, response) {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== "VALID") {
        const arr = {
            status: "ERROR",
            message: "Invalid token! Please check your authorization token and try again."
        };
        return response.status(401).send(arr);
    }

    const year = request.params.ano;

    Tcc.readTccByYear(year)
        .then((resolve) => {
            const arr = {
                status: "SUCCESS",
                data: resolve,
                message: "TCCs successfully retrieved."
            };
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                status: "ERROR",
                data: reject,
                message: "An error occurred while processing your request. Please try again later."
            };
            response.status(500).send(arr);
        });
};

module.exports = {
    read
};
