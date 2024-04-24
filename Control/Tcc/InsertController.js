const ModelDatabase = require('../../Model/DatabaseMongoose');
const TCC = require('../../Model/TCC');
const ModelJwtToken = require('../../Model/JwtToken');

const fs = require('fs');

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
    

    const image = request.files["image"];
    let imagePath = undefined
    
    if(image != undefined){
        fs.rename(image[0].path , "Uploads/Images/" + image[0].filename + ".jpg" , (erro)=> {});
        imagePath = "Uploads/Monographys/" + image[0].filename + ".jpg";
    }

    const monography = request.files["monography"];
    let monographyPath = undefined;
    
    if(monography != undefined){
        fs.rename(monography[0].path , "Uploads/Monographys/" + monography[0].filename + ".pdf" , (erro)=> {});
        monographyPath = "Uploads/Monographys/" + monography[0].filename + ".pdf";
    }
    
    const document = request.files["document"];
    let documentPath = undefined
    if (document != undefined){
        fs.rename(document[0].path , "Uploads/Documents/" + document[0].filename + ".pdf" , (erro)=>{});
        documentPath = "Uploads/Documents/" + document[0].filename + ".pdf";
    }

    const zip = request.files["zip"];
    let zipPath = undefined
    if (zip != undefined){
        fs.rename(zip[0].path , "Uploads/Zips/" + zip[0].filename + ".zip" , (erro)=>{});
        zipPath = "Uploads/Zips/" + zip[0].filename + ".zip";
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
            monographyPath,
            documentPath,
            zipPath,
            students,
            request.body.course_id,
            request.body.course_name,
            imagePath
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

module.exports = insert;

