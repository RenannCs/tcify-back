const ModelDatabase = require('../../Model/Database');
const database = new ModelDatabase();

const ModelTCC = require('../../Model/Tccs')
const Tcc =  new ModelTCC(database.connect());

const insert = function (request , response){
    Tcc.insertOne(request.body)
            .then((resolve) => {
                const arr = {
                    status: "SUCESS",
                    dados: resolve,
                    msg: "TCC inserido com sucesso"
                };
                response.status(200).send(arr);
            })
            .catch((reject) => {
                const arr = {
                    status: "ERROR",
                    dados: reject,
                    msg: "Ocorreu um erro"
                }
                response.status(400).send(arr);
            })
    }

module.exports = {
    insert
}