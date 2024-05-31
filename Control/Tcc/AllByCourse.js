const Tcc = require('../../Model/Tcc');
const Course = require('../../Model/Course');

module.exports = async (request, response) => {
    const id = request.params.id;

    const course = new Course();
    course.id = id;

    if(await course.exists() == null){
        const arr = {
            status: "ERROR",
            message: "Curso não existe!"
        };
        return response.status(404).send(arr);
    }

    const tcc = new Tcc();
    tcc.course_id = id;
        
    tcc.allByCourse()
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

}