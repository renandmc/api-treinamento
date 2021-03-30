const nodemailer = require("nodemailer");

const host = process.env.SMTP_HOST;
const port = parseInt(process.env.SMTP_PORT);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

const from = user;
const to = process.env.CRON_MAILTO;

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
  secure: false,
  tls: { rejectUnauthorized: false }
});

const envioEmail = async (titulo, mensagem) => {
  try {
    await transport.sendMail({
      from,
      to,
      subject: titulo,
      html: mensagem,
    });
  } catch (erro) {
    console.log(erro);
  }
};

module.exports = envioEmail;