const User = require('../../Model/User');

module.exports = async (request, response) => {
    const user = new User();
    try{
        const data = await user.all();
        const format = data.map((user)=>({
            _id: user.id,
            name: user.name,
            course_id: user.course_id,
            course_name: user.course_name,
            email: user.email,
            user_type: user.user_type,
            register: user.register,
            phone_number: user.phone_number ? user.phone_number : null,
            image: user.image ? user.image: "Default/profile_picture_default.webp"
        }));
        const arr = {
            status: "SUCESS",
            message: "Usuário recuperados com sucesso!",
            data: format
        };
        return response.status(200).send(arr);
    }catch{
        const arr = {
            status: "ERROR",
            message: "Ocorreu um erro ao recuperar os usuários!",
        };
        return response.status(400).send(arr);
    }
}