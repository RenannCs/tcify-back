const ModelTcc = require('../../Model/Tcc');

module.exports = async (request, response) => {
    const year = request.params.year

    const tcc = new ModelTcc();
    tcc.date = year;

    tcc.allByYear()
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
                    message: "No TCCs in the requested year."
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

}