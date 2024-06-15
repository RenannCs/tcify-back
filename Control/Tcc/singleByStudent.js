const User = require('../../Model/User');
const Tcc = require('../../Model/TCC');
const Group = require('../../Model/Group');
const { ObjectId } = require('mongodb');
module.exports = async (request , response) =>{
    const id = request.params.id;

    const group = new Group();

    const dataGroup = await group.findByStudentId(id);
    if(dataGroup == null){
        const arr = {
            status: "ERROR",
            message: "Usuário não possui grupo!"
        };
        return response.status(404).send(arr);
    }

    const idGroup = dataGroup.id;

    const tcc = new Tcc();
    const dataTcc = await tcc.singleFilter({"group_id": new ObjectId(idGroup)});
    if(dataTcc == null){
        const arr = {
            status: "ERROR",
            message: "Grupo não possui TCC!"
        };
        return response.status(404).send(arr);
    }

    const arr ={
        status: "SUCESS",
        message: "TCC recuperado com sucesso!",
        data: dataTcc
    };
    return response.status(200).send(arr);
}