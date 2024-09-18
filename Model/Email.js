const nodemailer = require("nodemailer");
const User = require("../Schemas/User");
const Group = require("../Schemas/Group");
module.exports = class Email {
  constructor(
    message = "",
    dest = "",
    subject = "",
    title = "Repositório TCC's Univap Centro"
  ) {
    this.message = message;
    this.dest = dest;
    this.subject = subject;
    this.title = title;
    this.port = process.env.EMAIL_PORT;
    this.host = process.env.EMAIL_HOST;
    this.email = process.env.EMAIL;
    this.password = process.env.EMAIL_PASSWORD;
    this.service = process.env.EMAIL_SERVICE;
  }

  async send() {
    try {
      const transporter = nodemailer.createTransport({
        host: this.host,
        port: this.port,
        secure: false,
        service: this.service,
        auth: {
          user: this.email,
          pass: this.password,
        },
        debug: false,
        logger: true,
      });

      const resp = await transporter.sendMail({
        from: '"Repositorio TCC\'s Univap Centro" <repositoriotccsunivap@yahoo.com>',
        to: this.dest,
        subject: this.subject,
        html: `
              <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exemplo de Email</title>
  <style>
    /* Estilos básicos */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4; /* Cor de fundo do corpo do email */
    }
    .container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background-color: #fff; /* Cor de fundo do conteúdo do email */
      border-radius: 8px; /* Cantos arredondados */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
    }
    .header {
      background-color: #007bff; /* Cor de fundo do cabeçalho */
      color: white;
      padding: 10px 0;
      text-align: center;
      border-top-left-radius: 8px; /* Cantos arredondados apenas no topo */
      border-top-right-radius: 8px;
    }
    .content {
      padding: 20px 0;
      color: #333; /* Cor do texto */
    }
    .footer {
      background-color: #007bff; /* Cor de fundo do rodapé */
      padding: 10px 0;
      text-align: center;
      border-bottom-left-radius: 8px; /* Cantos arredondados apenas na parte inferior */
      border-bottom-right-radius: 8px;
    }
  </style>
  </head>
  <body>
  
  <div class="container">
    <div class="header">
      <h1>Repositório TCC's Univap Centro</h1>
    </div>
    <div class="content">
      ${this.message}
    </div>
    <div class="footer">
      
    </div>
  </div>
  
  </body>
  </html>
  
              `,
      });
      return resp;
    } catch {}
  }

  async sendEmails(data) {
    try {
      for (const user of data) {
        const email = new Email();
        email.dest = user.email;
        email.subject = "Conectado ao repositório de TCC's da Univap Centro";
        email.message = `
              <br><p> Parabéns ${user.name}! Você foi conectado ao Repositório de TCC's da Univap Centro!</p>
              <br>Seus dados:<br>
              Nome: ${user.name}<br>
              Registro: ${user.register}<br>
              Curso: ${user.course_name}<br>
              Tipo de usuário: ${user.user_type}<br>
              Email: ${user.email}<br>
              Senha: ${user.password}<br>
              `;
        await email.send();
      }
    } catch {}
  }

  static async sendGroupInvites(group_id, students) {
    try {
      const group = await Group.single(group_id);
      for (let _student of students) {
        let student = await User.findById(_student).exec();

        let email = new Email();
        email.dest = student.email;
        email.subject = "Convite de grupo!";
        email.message = `
      <br><p>Você foi convidado para participar de um grupo no Repositório de TCC's da Univap Centro!</p>
      <br>Dados do grupo:<br>
      Título: ${group.title}<br>
      Líder: ${group.leader}<br>
      Para aceitar, acesse: ${
        "http://localhost:5173/" +
        "authorization/group/" +
        group._id +
        "/user/" +
        student.id
      }
      `;
        await email.send();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  static async sendGroupAdds(group_id, students) {
    try {
      const group = await Group.single(group_id);
      for (let _student of students) {
        let student = await User.findById(_student).exec();

        let email = new Email();
        email.dest = student.email;
        email.subject = "Adicionado à um grupo!";
        email.message = `
      <br><p>Você foi adicionado à um grupo por um professor no Repositório de TCC's da Univap Centro!</p>
      <br>Dados do grupo:<br>
      Título: ${group.title}<br>
      Líder: ${group.leader}<br>
      Acesse nosso site para acompanhar o seu grupo!
      `;
        await email.send();
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  get message() {
    return this._message;
  }
  set message(v) {
    this._message = v;
  }
  get dest() {
    return this._dest;
  }
  set dest(v) {
    this._dest = v;
  }
  get subject() {
    return this._subject;
  }
  set subject(v) {
    this._subject = v;
  }
  get title() {
    return this._title;
  }
  set title(v) {
    this._title = v;
  }
  get port() {
    return this._port;
  }
  set port(v) {
    this._port = v;
  }
  get host() {
    return this._host;
  }
  set host(v) {
    this._host = v;
  }
  get email() {
    return this._email;
  }
  set email(v) {
    this._email = v;
  }
  get password() {
    return this._password;
  }
  set password(v) {
    this._password = v;
  }
  get service() {
    return this._service;
  }
  set service(v) {
    this._service = v;
  }
};
