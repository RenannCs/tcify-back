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
          supervisor: data.supervisor,
          supervisor_id: data.supervisor_id,
          date: new Date(data.date).getFullYear(), 
          status: data.status,
          students: data.students,
          course_id: data.course_id,
          course_name: data.course_name,
          document: data.document ? process.env.API_PATH + data.document : null,
          monography: data.monography ? process.env.API_PATH + data.monography : null,
          zip: data.zip ? process.env.API_PATH + data.zip : null,
          image: data.image ? data.image : "Default/tcc_image_default.png"
        };
        const arr = {
          status: "SUCCESS",
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


