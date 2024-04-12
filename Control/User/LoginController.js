const ModelUser = require("../../Model/User");
const ModelJwtToken = require('../../Model/JwtToken');



const login = async (request , response)=>{
    const register = request.body.register;
    const password = request.body.password;

    const user = new ModelUser();
    user.register = register;
    user.password = password;
    
    user.login()
    .then((resolve)=>{
        if(resolve==null){
            const arr = {
                data: resolve,
                status:"ERROR",
                message: "Registro ou senha incorretos"
            }
            return response.status(400).send(arr);
        }
        const JwtToken = new ModelJwtToken();

        const token = JwtToken.createToken({
            "register": register,
            "password": password
        });

        const arr = {
            data: resolve,
            token: token,
            status: "SUCESS",
            message: "Usuário logado com sucesso"
        };

        return response.status(200).send(arr);
    })
    .catch((reject)=>{
        const arr = {
            status: "ERROR",
            data: reject,
            message: "An error occurred while processing your request. Please try again later."
        };
        response.status(400).send(arr);
    })
    
    
    
}

module.exports = login;