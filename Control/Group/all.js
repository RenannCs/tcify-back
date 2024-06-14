const Group =  require('../../Model/Group');

module.exports = async (request , response) => {
    const group = new Group();

    try{
        const data = await group.all();

        const format = data.map((group)=>({
            _id: group.id,
            students: group.students,
            leader: group.leaderId.name,
            leaderId: group.leaderId._id,
            status: group.status
        }));

        const arr = {
            status: "SUCESS",
            message: "Grupos recuperados com sucesso!",
            data: format
        };
        return response.status(200).send(arr);
    }catch{
        const arr = {
            status: "ERROR",
            message: "Ocorreu um erro ao recuperar os grupos!",
        };
        return response.status(400).send(arr);
    }

    /*
    group.all()
        .then((resolve)=>{
            const arr = {
                status: "SUCESS",
                message: "Grupos recuperados com sucesso!",
                data: resolve
            };
            return response.status(200).send(arr);
        })
        .catch((reject)=>{
            const arr = {
                status: "ERROR",
                message: "Ocorreu um erro ao recuperar os grupos!",
                data: reject
            };
            return response.status(400).send(arr);
        })*/
}