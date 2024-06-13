/**
 * INSERIR TCC
 *  
 * Adiciona um novo TCC com base nas informações passadas.
 * 
 * Só adiciona título, sumário, supervisor, data, grupo, id_curso, nome curso.
 * 
 */


const Tcc = require('../../Model/Tcc');
const Group = require('../../Model/Group');
const ModelJwtToken = require('../../Model/JwtToken');
const fs = require('fs');

const JwtToken = new ModelJwtToken();

module.exports =  async (request, response) =>{
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

    
    const title = request.body.title;
    const summary = request.body.summary;
    const supervisor = request.body.supervisor;
    const group_id = request.body.group_id;
    const course_id = request.body.course_id;


    const date = new Date();
    
    const group = new Group();
    group.id = group_id;

    
    if(await group.exists() == null){
        const arr = {
            status: "ERROR",
            message: "Grupo não existe"
        };
        return response.status(404).send(arr);
    }
    const tcc = new Tcc();
    if(await tcc.existsByGroupId(group_id) != null){
        const arr = {
            status: "ERROR",
            message: "Grupo já possui TCC!"
        };
        return response.status(400).send(arr);
    }

    tcc.title = title;
    tcc.summary = summary;
    tcc.supervisor = supervisor;
    tcc.date = date.toISOString();
    tcc.group = group_id;
    tcc.course_id = course_id;
    //tcc.image = "Default/tcc_image_default.png";
    tcc.status = 0;
    tcc.grade = 0;
    tcc.monography = monographyPath;
    tcc.document = documentPath;
    tcc.zip = zipPath;


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
    /*
    .finally(()=>{
        database.desconnect();
    })
    */
}