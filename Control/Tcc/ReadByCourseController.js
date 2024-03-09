const ModelDatabase = require('../../Model/Database');
const database = new ModelDatabase();

const ModelTCC = require('../../Model/Tccs')
const Tcc =  new ModelTCC(database.connect());

const read = function(request , response){
    Tcc.readTccByCourse(request.params.id)
    .then((resolve)=>{
        const arr = {
            status: "SUCESS",
            dados: resolve,
            msg: "Tccs recuperados com sucesso"
        };
        response.status(200).send(arr);
    })
    .catch((reject)=>{
        const arr = {
            status: "ERROR",
            dados: reject,
            msg: "Ocorreu um erro"
        };
        response.status(200).send(arr);
    })
}

module.exports = {
    read
}