const ModelDatabase = require('../../Model/Database');
const database = new ModelDatabase();

const ModelTCC = require('../../Model/Tccs')
const Tcc =  new ModelTCC(database.connect());

const update = function (request , response){
    Tcc.updateOne(request.params.id , request.body)
    .then((resolve) => {
        if (resolve.matchedCount == 1) {
            const arr = {
                status: "SUCESS",
                dados: resolve,
                msg: "Dados atualizados com sucesso"
            }
            response.status(200).send(arr);
        } else {
            const arr = {
                status: "ERROR",
                dados: resolve,
                msg: "Nenhum documento foi encontrado"
            }
            response.status(404).send(arr);
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
    update
}