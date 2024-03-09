const ModelDatabase = require('../../Model/Database');
const database = new ModelDatabase();

const ModelTCC = require('../../Model/Tccs')
const Tcc =  new ModelTCC(database.connect());

const remove = function(request , response){
    Tcc.deleteOne(request.params.id)
    .then((resolve) => {
        if (resolve.deletedCount === 1) {
            const arr = {
                status: "SUCESS",
                dados: resolve,
                msg: 'TCC excluído com sucesso'
            }
            response.status(200).send(arr);

        } else {

            const arr = {
                status: "ERROR",
                dados: resolve,
                msg: 'Nenhum TCC encontrado'
            }
            response.status(404).send(arr);

        }

    })

    .catch((reject) => {
        const arr = {
            status: "ERROR",
            dados: reject,
            msg: 'Ocorreu um erro'
        }
        response.status(400).send(arr);
    })
}

module.exports = {
    remove
}