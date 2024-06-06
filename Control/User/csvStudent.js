const User = require("../../Model/User");
const Course = require("../../Model/Course");
const Email = require("../../Model/Email");
const ModelJwtToken = require("../../Model/JwtToken");
const JwtToken = new ModelJwtToken();
const Papa = require("papaparse");
const fs = require("fs");

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

  const csv = request.files["data"][0];
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
      complete: async (results) => {
        fs.unlink(csv.path, () => {});
        for (const student of results.data) {
          try {
            const user = new User();
            user.name = student["name"];
            user.course_id = student["course_id"];
            user.email = student["email"];
            user.register = student["register"];
            user.user_type = "0";

            const strAll =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@";
            let password = "";

            for (let i = 0; i < 6; i++) {
              const n = Math.floor(Math.random() * strAll.length);
              password += strAll[n];
            }
            user.password = password;

            if ((await user.exists()) != null) {
              throw new Error();
            }
            const course = new Course();
            course.id = user.course_id;
            const course_name = await course.single();

            if (course_name == null) {
              throw new Error();
            }

            const email = new Email();
            email.dest = user.email;
            email.subject =
              "Conectado ao repositório de TCC's da Univap Centro";
            email.message = `
            <br><p> Parabéns ${user.name}! Você foi conectado ao Repositório de TCC's da Univap Centro!</p>
            <br>Seus dados:<br>
            Nome: ${user.name}<br>
            Registro: ${user.register}<br>
            Curso: ${course_name.name}<br>
            Tipo de usuário: Aluno<br>
            Email: ${user.email}<br>
            Senha: ${password}<br>
            `;
            email.send();
            await user.insert();
            sucessos.push(student["name"]);
          } catch (error) {
            erros.push(student["name"]);
          }
        }
        const arr = {
          status: "SUCESS",
          errors: erros,
          successes: sucessos,
          message: "Alunos inseridos",
        };
        return response.status(200).send(arr);
      },
    });
  });
};
