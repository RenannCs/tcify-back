const ModelDatabase = require('../../Model/Database');
const Database = new ModelDatabase();

const ModelAdmins = require('../../Model/Admins');
const Admin = new ModelAdmins(Database.connect());

const read = function (request , response){
    Admin.single(request.params.id)
    .then((resolve)=>{
        if (resolve == null){
            const arr = {
                status: "ERROR",
                dados: resolve,
                msg: "Adminstrador não encontrado"
            };
            response.status(404).send(arr);
        }else{
            const arr = {
                status: "SUCESS",
                dados: resolve,
                msg: "Administrador recuperado com sucesso"
            }; 
            response.status(200).send(arr);
        }
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