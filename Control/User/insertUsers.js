const User = require("../../Schemas/User");
const Course = require("../../Schemas/Course");
const Email = require("../../Model/Email");

const Papa = require("papaparse");
const fs = require("fs");
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  let csv;
  let mimetype;
  let formato;
  try {
    csv = request.file;
    mimetype = csv.mimetype;
    formato = mimetype.split("/")[1];

    if (!csv) {
      const arr = {
        status: "ERROR",
        message: "Arquivo CSV não enviado!",
      };
      return response.status(400).send(arr);
    }

    if (formato != "csv") {
      fs.unlink(csv.path, (error) => {
        if (error) {
          const arr = {
            status: "ERROR",
            message: "Ocorreu um erro ao ler o arquivo!",
          };
          return response.status(500).send(arr);
        }
      });
      const arr = {
        status: "ERROR",
        message: "Formato de arquivo inválido!",
      };
      return response.status(415).send(arr);
    }
  } catch {}

  let erros = [];
  let sucessos = [];

  fs.readFile(csv.path, "utf-8", (error, data) => {
    if (error) {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao ler o arquivo Csv",
        data: error,
      };
      return response.status(500).send(arr);
    }
    try {
      Papa.parse(data, {
        header: true,
        delimiter: ",",
        complete: async (results) => {
          const fields = [
            "Registro",
            "Tipo de Usuário",
            "Nome",
            "Curso",
            "E-mail",
            "Telefone",
            "Link Externo",
            "Status",
          ];

          for (let field of results.meta.fields) {
            if (!fields.includes(field)) {
              fs.unlink(csv.path, (error) => {
                if (error) {
                  const arr = {
                    status: "ERROR",
                    message: "Ocorreu um erro ao ler o arquivo!",
                    data: error,
                  };
                  return response.status(500).send(arr);
                }
              });
              const arr = {
                status: "ERROR",
                message: "Formato do CSV inválido!",
              };
              return response.status(400).send(arr);
            }
          }

          for (const _user of results.data) {
            try {
              const user = new User();

              user.name = _user["Nome"];
              user.email = _user["E-mail"];
              user.register = _user["Registro"];
              user.user_type = _user["Tipo de Usuário"];
              user.phone_number = _user["Telefone"];
              user.link = _user["Link Externo"];
              user.status = "1";
              user.password = register;
              
              if (_user["Registro"] == "") {
                throw new Error("Registro não pode ser vazio");
              }

              if (
                (await User.exists({ register: _user["Registro"] }).exec()) !=
                null
              ) {
                throw new Error("Registro já em uso!");
              }
              if (
                (await User.exists({ email: _user["E-mail"] }).exec()) != null
              ) {
                throw new Error("Email já em uso!");
              }

              if (
                !["Administrador", "Professor", "Estudante"].includes(
                  _user["Tipo de Usuário"]
                )
              ) {
                throw new Error("Tipo de usário inválido!");
              }

              let course;
              if (_user["Tipo de Usuário"] != "Administrador") {
                if (
                  (await Course.exists({
                    name: _user["Curso"],
                  })) == null
                ) {
                  throw new Error("Curso não existe!");
                }
                course = await Course.findOne({ name: _user["Curso"] }).exec();
                user.course_id = course.id;
              }

              const resp = await user.save();

              sucessos.push({
                _id: resp.id,
                name: user.name ? user.name : null,
                register: user.register ? user.register : null,
                course: course ? course.name : "N/A",
                course_id: course ? course.id : "N/A",
                user_type: user.user_type ? user.user_type : null,
                email: user.email ? user.email : null,
                phone_number: user.phone_number ? user.phone_number : null,
                link: user.link ? user.link : null,
                status: user.status,
              });
            } catch (error) {
              erros.push({
                name: _user["Nome"],
                register: _user["Registro"],
                course: _user["Curso"],
                user_type: _user["Tipo de Usuário"],
                email: _user["E-mail"],
                phone_number: _user["Telefone"],
                link: _user["Link"],
                status: _user["Status"],
                error: error.message,
              });
            }
          }

          fs.unlink(csv.path, () => {});
          const data = {
            errors: erros,
            successes: sucessos,
            insertCount: sucessos.length,
            errorsCount: erros.length,
          };
          /*
          try {
            const email = new Email();
            email.sendEmails(sucessos);
          } catch {}
          */
          const arr = {
            status: "SUCCESS",
            data: data,
            message: "Alunos inseridos",
          };
          return response.status(200).send(arr);
        },
      });
    } catch (error) {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao importar os alunos!",
        data: error,
      };
      return response.status(500).send(arr);
    }
  });
};
