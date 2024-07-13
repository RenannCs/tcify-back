const nodemailer = require("nodemailer");
const { parseConnectionUrl } = require("nodemailer/lib/shared");

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
