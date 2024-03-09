const ModelDatabase = require('../../Model/Database');
const database = new ModelDatabase();

const ModelTCC = require('../../Model/Tccs')
const Tcc =  new ModelTCC(database.connect());

const read = function (request , response) {
    Tcc.readAll()
    .then((resolve)=>{
        const arr = {
            status:200,
            dados: resolve,
            msg: "Dados recuperados com sucesso"
        };
        response.status(200).send(arr);
    })
    .catch((reject)=>{
        const arr = {
            status: 400,
            dados: reject,
            msg: "Ocorreu um erro"
        };
        response.status(400).status(arr);
    })
}

module.exports ={
    read
}
    
