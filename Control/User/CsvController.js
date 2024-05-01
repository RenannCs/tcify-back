const User = require("../../Model/User")
const ModelJwtToken = require('../../Model/JwtToken');
const JwtToken = new ModelJwtToken();
const Papa = require("papaparse");
const fs = require("fs");


module.exports = async (request , response) =>{
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

    
    const csv = request.files["data"][0];
    let erros = [];
    let sucessos = [];
    fs.readFile(csv.path , 'utf-8' , (err , data)=>{
        if(err){
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao ler o arquivo Csv"
            }
            return response.status(500).send(arr);
        }

        
        Papa.parse(data , {
            header: true,
            complete:  async (results)=>{
                fs.unlink(csv.path , ()=>{});
                for(const student of results.data){
                    try{
                        const user = new User();
                        user.name = student["name"];
                        user.course_name = student["course_name"];
                        user.email = student["email"];
                        user.register = student["register"];
                        user.password = student["register"];
                        const resp = await user.exist();
                        
                        if(resp){
                            throw new Error;
                        }
                        await user.insert();
                        sucessos.push(student["name"]);
                    }catch(error){                        
                        erros.push(student["name"]);
                    }
                }
            const arr = {
                status:"SUCESS",
                errors: erros,
                successes: sucessos,
                message: "Alunos inseridos"
            }
        
            return response.status(200).send(arr)
            }
        })
    })

    

}