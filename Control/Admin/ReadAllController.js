const ModelDatabase = require('../../Model/Database');
const Database = new ModelDatabase();

const ModelAdmins = require('../../Model/Admins');
const Admin = new ModelAdmins(Database.connect());

const read = function (request , response) {
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