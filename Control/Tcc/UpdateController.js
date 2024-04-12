const ModelTcc = require('../../Model/ModelTCCMongoose');
const ModelDatabase = require('../../Model/DatabaseMongoose');

const ModelJwtToken = require('../../Model/JwtToken');

const JwtToken = new ModelJwtToken();


const update = async (request, response) =>{
    const authorizationHeader = request.headers.authorization;
    const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

    if (tokenValidationResult.status !== true) {
        const arr = {
            status: 'ERROR',
            message: 'Invalid token! If the problem persists, please contact our technical support.',
            error: tokenValidationResult.error
        };
        return response.status(401).send(arr);
    }
    
    
    const id = request.params.id;


    const database = new ModelDatabase();
    database.conect();

    const tcc = await ModelTcc.findById(id);
    
    if (tcc == null){
        const arr = {
            status: "ERROR",
            message: "No document was found with the provided ID."
        }
        return response.status(404).send(arr);
    }

    const title = request.body.title;
    const summary = request.body.summary;
    const grade = request.body.grade;
    const supervisor = request.body.supervisor;
    const date = request.body. date;
    const students = request.body.students;
    const course_id = request.body.course_id;
    const course_name = request.body.course_name;

    
    if(title != undefined){
        tcc.title = title;
    }
    
    if(summary != undefined){
        tcc.summary = summary;
    }

    
    if(grade != undefined){
        tcc.grade = grade;
    }

    
    if(supervisor != undefined){
        tcc.supervisor = supervisor;
    }

    
    if(date != undefined){
        tcc.date = date;
    }

    
    if(students != undefined){
        tcc.group.students = JSON.parse(students);
    }

    
    if(course_id != undefined){
        tcc.course_id = course_id;
    }

    if(course_name != undefined){
        tcc.course_name = course_name;
    }

    tcc.save()
        .then((resolve) => {
            const arr = {
                data: resolve,
                status: "SUCCESS",
                 message: "TCC updated successfully."
            }
            response.status(200).send(arr);
        })
        .catch((reject) => {
            const arr = {
                data: reject,
                status: "ERROR",
                message: "An error occurred while processing your request. Please try again later."
            };
            response.status(400).send(arr);
        })
}

module.exports = {
    update
}
