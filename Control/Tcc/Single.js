const Tcc = require('../../Model/Tcc');

module.exports = async (request, response) => {
    /*
    const database = new ModelDatabase();
    await database.conect();
    */
    const id = request.params.id;
    const tcc = new Tcc(id);
    tcc.single()
        .then((resolve) => {
            if (resolve == null) {
                const arr = {
                    data: resolve,
                    status: "ERROR",
                    message: 'No document was found with the provided ID.'
                };
                response.status(404).send(arr);
            } else {
                const arr = {
                    data: resolve,
                    status: "SUCCESS",
                    message: "TCC successfully retrieved."
                };
                response.status(200).send(arr);
            }
        })
        .catch((reject) => {
            const arr = {
                status: "ERROR",
                data: reject,
                message: "An error occurred while processing your request. Please try again later."
            };
            response.status(400).send(arr);
        })
        /*
        .finally(()=>{
            database.desconnect();
        })*/
};


