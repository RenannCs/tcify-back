const ModelDatabase = require('../../Model/Database');
const database = new ModelDatabase();

const ModelTCC = require('../../Model/Tccs')
const Tcc =  new ModelTCC(database.connect());

const read = function (request , response) {
    Tcc.single(request.params.id)
    .then((resolve)=>{
        if (resolve == null) {
            const arr = {
                status: "ERROR",
                dados: resolve,
                msg: 'TCC não existe'
            };
            response.status(404).send(arr);
        } else {
            const arr = {
                status: "SUCESS",
                dados: resolve,
                msg: "TCC encontrado"
            };
            response.status(200).send(arr);
        }
    })
    .catch((reject) => {
        const arr = {
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