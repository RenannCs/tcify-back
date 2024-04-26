const ModelTcc = require('../../Model/TCC');
const ModelJwtToken = require('../../Model/JwtToken');
const ModelDatabase = require('../../Model/Database');
const JwtToken = new ModelJwtToken();

module.exports = async (request, response) => {
    const database = new ModelDatabase();
    await database.conect();
    const id = request.params.id;
    const tcc = new ModelTcc();
    tcc.course_id = id;
    

    tcc.readByCourse()
        .then((resolve) => {
            if (resolve && resolve.length > 0) {
                const arr = {
                    data: resolve,
                    status: "SUCCESS",
                    message: "TCCs successfully retrieved."
                };
                response.status(200).send(arr);
            } else {
                const arr = {
                    data: resolve,
                    status: "SUCCESS",
                    message: "No TCCs with the provided course ID."
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
        .finally(()=>{
            database.desconnect();
        })

}