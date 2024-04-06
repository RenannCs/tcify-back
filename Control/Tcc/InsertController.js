const ModelTcc = require('../../Model/TCCmongoose').tccModel;

const ModelJwtToken = require('../../Model/JwtToken');

const fs = require('fs');
const { promisify } = require('util');

const JwtToken = new ModelJwtToken();

const insert = async (request, response) =>{
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
    
    const tcc = new ModelTcc();
    


    const image = request.files["image"];
    
    if(image != undefined){
        let imageBase64 = await promisify(fs.readFile)(image[0].path, { encoding: 'base64' });
        const type = image[0].mimetype;
        imageBase64 = "data:" + type + ";base64," + imageBase64;
        await promisify(fs.unlink)(image[0].path);
        tcc.image = imageBase64;
    }

    const monography = request.files["monography"];
    
    if(monography != undefined){
        fs.rename(monography[0].path , "Uploads/Monographys/" + monography[0].filename , (erro)=> {});
        tcc.file.monography = "Uploads/Monographys/" + monography[0].filename;
    }
    
    const document = request.files["document"];

    if (document != undefined){
        fs.rename(document[0].path , "Uploads/Documents/" + document[0].filename , (erro)=>{});
        tcc.file.document = "Uploads/Documents/" + document[0].filename;
    }

    const zip = request.files["zip"];

    if (zip != undefined){
        fs.rename(zip[0].path , "Uploads/Zips/" + zip[0].filename , (erro)=>{});
        tcc.file.zip = "Uploads/Zips/" + zip[0].filename;
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
    .then((resolve)=>{
        const arr = {
            data: resolve,
            status: 'SUCCESS',
            message: 'TCC inserted successfully.'
        };
        response.status(200).send(arr);
    })
    .catch((reject)=>{
        const arr = {
            data: reject,
            status: 'ERROR',
            message: 'An error occurred while processing your request. Please try again later.'
        };
        response.status(400).send(arr);
    })
    

    


    
}

module.exports = {
    insert
}
