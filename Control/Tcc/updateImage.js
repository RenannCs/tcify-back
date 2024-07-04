/**
 * CONTROLE DE IMAGEM.
 *  
 * Pode fazer a inserção de uma imagem nova ou atualizar
 * uma já existente. Altera também no Banco de Dados.
 */

const ModelTcc = require("../../Model/Tcc");
const ModelJwtToken = require('../../Model/JwtToken');
const imageSize = require('image-size');
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


    const tcc = new ModelTcc();
    tcc.id = id;
    const res = await tcc.exist()
    if (!res) {
        const arr = {
            status: "ERROR",
            message: "TCC não existe!"
        }
        return response.status(404).send(arr);
    }

    const tamanhoMax = 1024 * 1024 * 10;
    const image = request.files["image"];

    if (image == undefined){
        //database.desconnect();
        const arr = {
            status: "ERROR",
            message: "Nenhuma imagem foi enviada!"
        }
        return response.status(404).send(arr);
    }

    if(image[0].size > tamanhoMax){
        //database.desconnect();
        const arr = {
            status: "ERROR",
            message: "Imagem muito grande!"
        }
        return response.status(413).send(arr);
    }
    
    
    //const imagePath = image[0].path;
    const imagePath = image[0].path;
    const dimensions = await imageSize(imagePath);
    const { width, height } = dimensions;
    
    if (width > 5000 || height > 5000) {
        //database.desconnect();
        const arr = {
            status: "ERROR",
            message: "As dimensões da imagem são muito grandes!"
        }
        return response.status(413).send(arr);
    }

    const dataTcc = await tcc.single();
    const caminhoAntigo = dataTcc.image;
    const novoCaminho = "Uploads/TccsImages/" + tcc.id + ".jpg";
    
    try{
        if(caminhoAntigo != "Default/tcc_image_default.png"){
            fs.unlink(caminhoAntigo , (error)=>{})
        }
        fs.rename(image[0].path , novoCaminho , (error)=>{});
        tcc.image = novoCaminho;
        await tcc.update();
        

        const arr = {
            status: "SUCCESS",
            message: "Imagem atualizada com sucesso",
        }
        return response.status(200).send(arr);
    }catch{
        const arr = {
            status: "ERROR",
            message: "Ocorreu um erro ao procesar a imagem!"
        }
        return response.status(400).send(arr);
    }
    /*
    fs.access(caminhoAntigo , fs.constants.F_OK , async (err)=>{
        if(err){
            fs.rename(image[0].path , "Uploads/Images/" + id + ".jpg" , (erro)=> {});
            tcc.image = "Uploads/Images/" + id + ".jpg";
            try{
                await tcc.update();
                //database.desconnect();
                const arr = {
                    status: "SUCCESS",
                    message: "Imagem inserida com sucesso"
                }
                return response.status(200).send(arr);
            }catch(err){
                //database.desconnect();
                const arr = {
                    status: "ERROR",
                    message: "Ocorreu um erro ao processar a imagem!",
                    
                };
                return response.status(404).send(arr);
            }
            
        }

        fs.unlink(caminhoAntigo, async (err) => {
            fs.rename(image[0].path , "Uploads/Images/" + id + ".jpg" ,  (erro)=> {});
            tcc.image = "Uploads/Images/" + id + ".jpg";
            try{
                await tcc.update();
                //database.desconnect();
                const arr = {
                    status: "SUCCESS",
                    message: "Imagem atualizada com sucesso"
                }
                return response.status(200).send(arr);
            }catch(err){
                //database.desconnect();
                const arr = {
                    status: "ERROR",
                    message: "Ocorreu um erro ao processar a imagem!",
                    
                };
                return response.status(404).send(arr);
            }
        });
    })*/

}