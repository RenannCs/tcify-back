const Tcc = require('../../Model/Tcc');

module.exports = async (request, response) => {
    const id = request.params.id;
    const tcc = new Tcc(id);

    try{
        const data = await tcc.single();

        const format = {
          _id: data._id,
          title: data.title,
          summary: data.summary ? data.summary : null,
          grade: data.grade ? data.grade : null,
          supervisor: data.supervisor.name,
          supervisor_id: data.supervisor._id,
          date: data.date,
          status: data.status,
          group: data.group.students,
          course_id: data.course_id._id,
          course_name: data.course_id.course_name,
          document: data.document ? data.document : null,
          monography: data.monography ? data.monography : null,
          zip: data.zip ? data.zip : null,
          image: data.image ? data.image : "Default/tcc_image_default.png"
        };
        const arr = {
          status: "SUCESS",
          message: "TCC's recuperados com sucesso!",
          data: format
        };
        return response.status(200).send(arr);
      }catch {
        const arr ={ 
          status: "ERROR",
          message: "Ocorreu um erro ao buscar os TCC's"
        };
        return response.status(400).send(arr);
      }
    /*
    tcc.single()
        .then((resolve) => {
            if (resolve == null) {
                const arr = {
                    data: resolve,
                    status: "ERROR",
                    message: 'No document was found with the provided ID.'
                };
                response.status(404).send(arr);
            } else {
                const arr = {
                    data: resolve,
                    status: "SUCCESS",
                    message: "TCC successfully retrieved."
                };
                response.status(200).send(arr);
            }
        })
        .catch((reject) => {
            const arr = {
                status: "ERROR",
                data: reject,
                message: "An error occurred while processing your request. Please try again later."
            };
            response.status(400).send(arr);
        })
        /*
        .finally(()=>{
            database.desconnect();
        })*/
};


