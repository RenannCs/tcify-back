/**
 * INSERIR TCC
 *  
 * Adiciona um novo TCC com base nas informações passadas.
 * 
 * Só adiciona título, sumário, supervisor, data, estudantes, id_curso, nome curso.
 * 
 */

const ModelDatabase = require('../../Model/Database');
const TCC = require('../../Model/TCC');
const User = require('../../Model/User');
const ModelJwtToken = require('../../Model/JwtToken');
/*
const fs = require('fs');
*/
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
    /*
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
    */
    const database = new ModelDatabase();
    await database.conect();
    
    let studentsArray = [];
    const student1Id = request.body.student1;
    const student2Id = request.body.student2;
    const student3Id = request.body.student3;

    if(student1Id != undefined){
        const student1 = new User();
        student1.register = student1Id;
        const student1Data = await student1.singleFilterByRegister();
        studentsArray.push(student1Data);
    }
    
    if(student2Id != undefined){
        const student2 = new User();
        student2.register = student2Id
        const student2Data = await student2.singleFilterByRegister();
        studentsArray.push(student2Data);
    }
    
    if(student3Id != undefined){
        const student3 = new User();
        student3.register = student3Id;
        const student3Data = await student3.singleFilterByRegister();
        studentsArray.push(student3Data);
    }
    
    const tcc = new TCC(
            undefined,
            request.body.title,
            request.body.summary,
            undefined,
            request.body.supervisor,
            request.body.date,
            false,
            undefined,
            undefined,
            undefined,
            studentsArray,
            request.body.course_id,
            request.body.course_name,
            undefined
        )

    
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
    .finally(()=>{
        database.desconnect();
    })
    
}