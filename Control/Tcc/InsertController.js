const ModelDatabase = require('../../Model/DatabaseMongoose');
const TCC = require('../../Model/TCC');
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
    
    
    
    const files = {}

    const image = request.files["image"];
    let imageBase64 = undefined
    if(image != undefined){
        imageBase64 = await promisify(fs.readFile)(image[0].path, { encoding: 'base64' });
        const type = image[0].mimetype;
        imageBase64 = "data:" + type + ";base64," + imageBase64;
        await promisify(fs.unlink)(image[0].path);
    }

    const monography = request.files["monography"];
    
    if(monography != undefined){
        fs.rename(monography[0].path , "Uploads/Monographys/" + monography[0].filename , (erro)=> {});
        files.monography = "Uploads/Monographys/" + monography[0].filename;
    }
    
    const document = request.files["document"];

    if (document != undefined){
        fs.rename(document[0].path , "Uploads/Documents/" + document[0].filename , (erro)=>{});
        files.document = "Uploads/Documents/" + document[0].filename;
    }

    const zip = request.files["zip"];

    if (zip != undefined){
        fs.rename(zip[0].path , "Uploads/Zips/" + zip[0].filename , (erro)=>{});
        files.zip = "Uploads/Zips/" + zip[0].filename;
    }
    
    const students = request.body.students != undefined ? JSON.parse(request.body.students): undefined;
    const tcc = new TCC(
            request.body.id,
            request.body.title,
            request.body.summary,
            request.body.grade,
            request.body.supervisor,
            request.body.date,
            false,
            files,
            students,
            request.body.course_id,
            request.body.course_name,
            imageBase64
        )

    const database = new ModelDatabase();
    database.conect();
    tcc.insert()
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
