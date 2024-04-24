const ModelDatabase = require("../../Model/DatabaseMongoose");
const ModelTcc = require("../../Model/TCC");
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
    
    const id = request.params.id;

    const database = new ModelDatabase();
    database.conect();

    const tcc = new ModelTcc();
    tcc.id = id;
    const res = await tcc.exist()
    if (!res) {
        const arr = {
            status: "ERROR",
            message: "TCC não existe"
        }
        return response.status(404).send(arr);
    }

    const tamanhoMax = 1024 * 1024 * 5;
    const image = request.files["image"];

    if(image[0].size > tamanhoMax){
        const arr = {
            status: "ERROR",
            message: "Imagem muito grande!"
        }
        return response.status(413).send(arr);
    }
    
    const caminhoAntigo = "Uploads/Images/" + id + ".jpg";
    
    fs.access(caminhoAntigo , fs.constants.F_OK , (err)=>{
        if(err){
            fs.rename(image[0].path , "Uploads/Images/" + id + ".jpg" , (erro)=> {});
            const arr = {
                status: "SUCESS",
                message: "Imagem inserida com sucesso"
            }
            return response.status(200).send(arr);
        }

        fs.unlink(caminhoAntigo, (err) => {
            fs.rename(image[0].path , "Uploads/Images/" + id + ".jpg" , (erro)=> {});
            const arr = {
                status: "SUCESS",
                message: "Imagem substítuida com sucesso"
            }
            return response.status(200).send(arr);
        });
    })

}