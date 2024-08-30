/**
 * INSERIR TCC
 *
 * Adiciona um novo TCC com base nas informações passadas.
 *
 * Só adiciona título, sumário, supervisor, data, grupo, id_curso, nome curso.
 *
 */

const Tcc = require("../../Schemas/Tcc");
const Group = require("../../Schemas/Group");
const User = require("../../Schemas/User");
const { ObjectId, BSON } = require("mongodb");
const fs = require("fs");
const fs_extra = require("fs-extra");
module.exports = async (request, response) => {
  let tcc;

  let title;
  let summary;
  let supervisor;
  let group_id;
  let course_id;

  // let monography;
  // let monography_path = "";

  // let document;
  // let document_path = "";

  // let zip;
  // let zip_path = "";

  // let image;
  // let image_path = "";

  try {
    summary = request.body.summary;
    group_id = request.body.group_id;

    const group = await Group.findById(new ObjectId(group_id)).exec();

    if (group == null) {
      await fs_extra.emptyDir("Temp");
      const arr = {
        status: "ERROR",
        message: "Grupo não existe!",
      };
      return response.status(404).send(arr);
    }
    if ((await Tcc.findOne({ group_id: group_id }).exec()) != null) {
      await fs_extra.emptyDir("Temp");
      const arr = {
        status: "ERROR",
        message: "Grupo já possui TCC!",
      };
      return response.status(409).send(arr);
    }

    supervisor = group.supervisor_id;
    course_id = group.course_id;
    title = group.title;

    tcc = new Tcc();

    tcc.title = title;
    tcc.summary = summary;
    tcc.group_id = group_id;
    tcc.supervisor_id = supervisor;
    tcc.course_id = course_id;

    const resp = await tcc.save();

    group.tcc_id = resp._id;
    await group.save();

    const aux = await Tcc.single(resp._id);

    const arr = {
      status: "SUCCESS",
      message: "TCC inserido com sucesso!",
      data: aux,
    };
    return response.status(200).send(arr);
  } catch (error) {
    await fs_extra.emptyDir("Temp");
    const arr = {
      status: "ERROR",
      message: "Erro de servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }
};
/*
  tcc
    .save()
    .then((data) => {
      return Tcc.single(data.id);
    })
    .then((resolve) => {
      if (resolve.monography != null) {
        resolve.monography = process.env.API_PATH + resolve.monography;
      }
      if (resolve.document != null) {
        resolve.document = process.env.API_PATH + resolve.document;
      }
      if (resolve.zip != null) {
        resolve.zip = process.env.API_PATH + resolve.zip;
      }
      if (resolve.image != null) {
        resolve.image = process.env.API_PATH + resolve.image;
      } else {
        resolve.image = process.env.API_PATH + process.env.TCC_PICTURE_DEFAULT;
      }
      const arr = {
        status: "SUCCESS",
        message: "TCC inserido com sucesso!",
        data: resolve,
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      fs_extra.emptyDirSync("Temp");
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao inserir o TCC!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
*/
//Tratamento da monografia
// const arrMonography = request.files["monography"];
//     if (arrMonography != undefined) {
//       monography = arrMonography[0];

//       const tipoMonografia = ["pdf", "docx"];
//       const mimeMonografia = monography.mimetype;
//       const tipoMonografiaAtual = mimeMonografia.split("/")[1];

//       //Verifica o tipo da monografia
//       if (!tipoMonografia.includes(tipoMonografiaAtual)) {
//         await fs_extra.emptyDir("Temp");

//         const arr = {
//           status: "ERROR",
//           message: "Formato da monografia inválido!",
//         };
//         return response.status(415).send(arr);
//       }
//       /***********************************************/

//       //Verifica o tamanho da monografia
//       if (monography.size > 1024 * 1024 * 80) {
//         //80mb
//         await fs_extra.emptyDir("Temp");

//         const arr = {
//           status: "ERROR",
//           message: "Monografia muito grande!",
//         };
//         return response.status(413).send(arr);
//       }
//       /**********************************************/

//       monography_path =
//         "Uploads/Monographys/" + tcc.id + "." + tipoMonografiaAtual;

//       //Salva a manografia

//       tcc.monography = monography_path;
//       /**********************************************************/
//     }
//     /**************************************************************************/

//     //Tratamento documento
//     const arrDocument = request.files["document"];
//     if (arrDocument != undefined) {
//       document = arrDocument[0];

//       const tipoDocument = ["pdf", "docx"];
//       const mimeDocument = document.mimetype;
//       const tipoDocumentAtual = mimeDocument.split("/")[1];

//       if (!tipoDocument.includes(tipoDocumentAtual)) {
//         await fs_extra.emptyDir("Temp");

//         const arr = {
//           status: "ERROR",
//           message: "Tipo do documento inválido!",
//         };
//         return response.status(415).send(arr);
//       }

//       if (document.size > 1024 * 1024 * 50) {
//         await fs_extra.emptyDir("Temp");
//         const arr = {
//           status: "ERROR",
//           message: "Documento muito grande!",
//         };
//         return response.status(413).send(arr);
//       }

//       document_path = "Uploads/Documents/" + tcc.id + "." + tipoDocumentAtual;

//       tcc.document = document_path;
//     }
//     /****************************************************************************/

//     //Tratamento arquivo zip
//     const arrZip = request.files["zip"];
//     if (arrZip != undefined) {
//       zip = arrZip[0];

//       const mimeZip = zip.mimetype;
//       const tipoZipAtual = mimeZip.split("/")[1];
//       if (tipoZipAtual != "zip") {
//         await fs_extra.emptyDir("Temp");

//         const arr = {
//           status: "ERROR",
//           message: "Arquivo Zip inválido!",
//         };
//         return response.status(415).send(arr);
//       }

//       if (zip.size > 1024 * 1024 * 100) {
//         await fs_extra.emptyDir("Temp");

//         const arr = {
//           status: "ERROR",
//           message: "Arquivo Zip muito grande!",
//         };
//         return response.status(413).send(arr);
//       }

//       zip_path = "Uploads/Zips/" + tcc.id + "." + "zip";

//       tcc.zip = zip_path;
//     }
//     /*********************************************************/
//     //Tratamento da imagem
//     const arrImage = request.files["image"];
//     if (arrImage != undefined) {
//       image = arrImage[0];

//       const tipoImagem = ["png", "jpg", "jpeg", "webp"];
//       const mimeImage = image.mimetype;
//       const tipoImagemAtual = mimeImage.split("/")[1];

//       if (!tipoImagem.includes(tipoImagemAtual)) {
//         await fs_extra.emptyDir("Temp");

//         const arr = {
//           status: "ERROR",
//           message: "Tipo de imagem inválido!",
//         };
//         return response.status(415).send(arr);
//       }

//       if (image.size > 1024 * 1024 * 20) {
//         await fs_extra.emptyDir("Temp");

//         const arr = {
//           status: "ERROR",
//           message: "Tamanho da imagem muito grande!",
//         };
//         return response.status(413).send(arr);
//       }

//       image_path = "Uploads/TccsImages/" + tcc.id + "." + tipoImagemAtual;

//       tcc.image = image_path;
//     }

//     /*****************************************************************/

//     if (monography_path != "") {
//       fs.rename(monography.path, monography_path, (error) => {
//         if (error) {
//           fs_extra.emptyDirSync("Temp");
//           const arr = {
//             status: "ERROR",
//             message: "Ocorreu um erro ao ler o arquivo!",
//             data: error,
//           };
//           return response.status(500).send(arr);
//         }
//       });
//     }

//     if (document_path != "") {
//       fs.rename(document.path, document_path, (error) => {
//         if (error) {
//           fs.unlink(monography_path, (error) => {});
//           fs_extra.emptyDirSync("Temp");
//           const arr = {
//             status: "ERROR",
//             message: "Ocorreu um erro ao ler o arquivo!",
//             data: error,
//           };
//           return response.status(500).send(arr);
//         }
//       });
//     }

//     if (zip_path != "") {
//       fs.rename(zip.path, zip_path, (error) => {
//         if (error) {
//           fs.unlink(monography_path, (error) => {});
//           fs.unlink(document_path, (error) => {});

//           fs_extra.emptyDirSync("Temp");
//           const arr = {
//             status: "ERROR",
//             message: "Ocorreu um erro ao ler o arquivo!",
//             data: error,
//           };
//           return response.status(500).send(arr);
//         }
//       });
//     }

//     if (image_path != "") {
//       fs.rename(image.path, image_path, (error) => {
//         if (error) {
//           fs.unlink(monography_path, (error) => {});
//           fs.unlink(document_path, (error) => {});
//           fs.unlink(zip_path, (error) => {});
//           fs_extra.emptyDirSync("Temp");
//           const arr = {
//             status: "ERROR",
//             message: "Ocorreu um erro ao ler o arquivo!",
//             data: error,
//           };
//           return response.status(500).send(arr);
//         }
//       });
//     }
