const ModelDatabase = require('../../Model/Database');
const ModelJwtToken = require('../../Model/JwtToken');
const ModelAdmins = require('../../Model/Admins');

const Database = new ModelDatabase();
const Admin = new ModelAdmins(Database.connect());
const JwtToken = new ModelJwtToken();

const read = function (request , response) {
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== "VALID") {
        const arr = {
            status: "ERROR",
            message: "Invalid token! Please check your authorization token and try again."
        };
        return response.status(401).send(arr);
    }

    Admin.readAll()
    .then((resolve)=>{
        const arr = {
            status: "SUCESS",
            dados: resolve,
            msg: "Adminstradores recuperados com sucesso"
        }
        response.status(200).send(arr);
    })
    .catch((reject)=>{
        const arr ={
            status: "ERROR",
            dados: reject,
            msg: "Ocorreu um erro"
        };
        response.status(400).send(arr);
    })
}

module.exports = {
    read
}