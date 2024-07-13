const User = require("../../Schemas/User");
const Course = require("../../Schemas/Course");
const Email = require("../../Model/Email");
const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
const Papa = require("papaparse");
const fs = require("fs");
const { ObjectId, BSON } = require("mongodb");

module.exports = async (request, response) => {
  const authorizationHeader = request.headers.authorization;
  const tokenValidationResult = JwtToken.validateToken(authorizationHeader);

  if (tokenValidationResult.status !== true) {
    const arr = {
      status: "ERROR",
      message:
        "Invalid token! If the problem persists, please contact our technical support.",
      error: tokenValidationResult.error,
    };
    return response.status(401).send(arr);
  }

  const csv = request.file;
  let erros = [];
  let sucessos = [];

  fs.readFile(csv.path, "utf-8", (err, data) => {
    if (err) {
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao ler o arquivo Csv",
      };
      return response.status(500).send(arr);
    }

    Papa.parse(data, {
      header: true,
      delimiter: ",",
      complete: async (results) => {
        for (const _user of results.data) {
          try {
            const user = new User();

            user.name = _user["Nome"];

            user.email = _user["E-mail"];
            user.register = _user["Registro"];
            user.user_type = _user["Tipo de Usuário"];
            user.phone_number = _user["Telefone"];
            user.link = _user["Link Externo"];
            user.status = true;
            const strAll =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@";
            let password = "";
            for (let i = 0; i < 6; i++) {
              const n = Math.floor(Math.random() * strAll.length);
              password += strAll[n];
            }
            user.password = password;

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

            await user.save();

            sucessos.push({
              name: user.name,
              register: user.register,
              course_name: course ? course.name : "Administrador",
              user_type: user.user_type,
              email: user.email,
              password: password,
            });
          } catch (error) {
            if (error instanceof BSON.BSONError) {
              erros.push({
                name: _user["Nome"],
                register: _user["Registro"],
                course_name: _user["Curso"],
                user_type: _user["Tipo de Usuário"],
                email: _user["E-mail"],
                erro: "Id do curso inválido!",
              });
            } else {
              erros.push({
                name: _user["Nome"],
                register: _user["Registro"],
                course_name: _user["Curso"],
                user_type: _user["Tipo de Usuário"],
                email: _user["E-mail"],
                error: error.message,
              });
            }
          }
        }

        fs.unlink(csv.path, () => {});
        const data = {
          errors: erros,
          successes: sucessos,
          insertCount: sucessos.length,
          errorsCount: erros.length,
        };

        try {
          const email = new Email();
          email.sendEmails(sucessos);
        } catch {}

        const arr = {
          status: "SUCCESS",
          data: data,
          message: "Alunos inseridos",
        };
        return response.status(200).send(arr);
      },
    });
  });
};
