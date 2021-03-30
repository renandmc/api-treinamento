const moment = require("moment");
const cronJob = require("cron").CronJob;
const sequelize = require("sequelize");
const axios = require("axios");

const envioEmail = require('./email');

const Certificado = require("../models/Certificado");
const Incidente = require("../models/Incidente");

const CRON_INCIDENTES = process.env.CRON_INCIDENTES;
const CRON_CERTIFICADOS = process.env.CRON_CERTIFICADOS;
const CRON_ERROS = process.env.CRON_ERROS;

const API_KEY = process.env.SAP_APIKEY;
const API_ERROS_COUNT = process.env.SAP_API_ERROS_COUNT;
const API_ERROS = process.env.SAP_API_ERROS;

const configVencimento = 10;
const vencimento = moment().add(configVencimento, 'days').toISOString();

const cronIncidentes = new cronJob(
  CRON_INCIDENTES,
  async () => {
    try {
      console.log(`CRON Incidentes - [${moment().format("DD/MM/YYYY HH:mm")}]`);
      const incidentes = await Incidente.findAll({
        order: [["vencimento", "ASC"]],
        where: {
          status: "A",
          vencimento: { [sequelize.Op.lte]: vencimento },
        },
        raw: true
      });
      const num_incidentes = incidentes.length;
      if (num_incidentes > 0) {
        const titulo = `[AVISO] - ${num_incidentes} incidentes vencem até ${moment(vencimento).format("DD/MM/YYYY")}`;
        console.log(titulo);
        let message = `<p><i>E-mail enviado automaticamente, favor não responder</i></p>` +
          `<h2>${num_incidentes} incidentes que vencem até ${moment(vencimento).format("DD/MM/YYYY")}</h2><hr/>`;
        incidentes.forEach((incidente) => {
          message = message +
            `<p><b>Incidente:</b> ${incidente.assunto}</p>` +
            `<p><b>Descrição:</b> ${incidente.descricao}</p>` +
            `<p><b>Vencimento:</b> ${moment(incidente.vencimento).format("DD/MM/YYYY")}</p><hr/>`;
        });
        message = message +
          `<p><i>E-mail enviado ${moment().format("DD/MM/YYYY HH:mm:ss")}</i></p>`;
        await envioEmail(titulo, message);
      } else {
        console.log("Sem incidentes vencendo");
      }
    } catch (erro) {
      console.log(erro);
    }
  },
  null,
  false,
  "America/Sao_Paulo"
);

const cronCertificados = new cronJob(
  CRON_CERTIFICADOS,
  async () => {
    try {
      console.log(`CRON Certificados - [${moment().format("DD/MM/YYYY HH:mm")}]`);
      const certificados = await Certificado.findAll({
        order: [["data_expiracao", "ASC"]],
        where: {
          data_expiracao: { [sequelize.Op.lte]: vencimento },
        },
        raw: true,
      });
      const num_certificados = certificados.length;
      if (num_certificados > 0) {
        const titulo = `[AVISO] - ${num_certificados} certificados expiram até ${moment(vencimento).format("DD/MM/YYYY")}`;
        console.log(titulo);
        let message = `<p><i>E-mail enviado automaticamente, favor não responder</i></p>` +
          `<h2>${num_certificados} certificados que expiram até ${moment(vencimento).format("DD/MM/YYYY")}</h2><hr/>`;
        certificados.forEach((certificado) => {
          message = message +
            `<p><b>Certificado:</b> ${certificado.certificado}</p>` +
            `<p><b>Data expiração:</b> ${moment(certificado.data_expiracao).format("DD/MM/YYYY")}</p><hr/>`;
        });
        message = message +
          `<p><i>E-mail enviado ${moment().format("DD/MM/YYYY HH:mm:ss")}</i></p>`;
        await envioEmail(titulo, message);
      } else {
        console.log("Sem certificados expirando");
      }
    } catch (erro) {
      console.log(erro);
    }
  },
  null,
  false,
  "America/Sao_Paulo"
);

const cronErros = new cronJob(
  CRON_ERROS,
  async () => {
    try {
      console.log(`CRON Erros CPI - [${moment().format("DD/MM/YYYY HH:mm")}]`);
      let responseCount = await axios.get(API_ERROS_COUNT, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          APIKey: API_KEY,
        },
      });
      const countErros = responseCount.data;
      if (countErros > 0) {
        // Fazendo a requisição na API Erros CPI
        let responseErros = await axios.get(API_ERROS, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            APIKey: API_KEY,
          },
        });
        // Filtrando somente dados importates da resposta
        let erros = responseErros.data.d.results.map((result) => {
          let dataInicio = moment(
            parseInt(result.LogStart.split("(")[1].split(")")[0])
          ).format("DD/MM/YYYY HH:mm:ss");
          let dataFim = moment(
            parseInt(result.LogEnd.split("(")[1].split(")")[0])
          ).format("DD/MM/YYYY HH:mm:ss");
          return {
            id: result.MessageGuid,
            inicio: dataInicio,
            fim: dataFim,
            nome: result.IntegrationFlowName,
            status: result.Status,
          };
        });
        // Criando e-mail a ser enviado
        const titulo = `[AVISO] - ${countErros} erros no CPI até ${moment().format(
          "DD/MM/YYYY"
        )}`;
        console.log(titulo);
        let message =
          `<p><i>E-mail enviado automaticamente, favor não responder</i></p>` +
          `<h2>${countErros} erros no CPI registrados até ${moment().format(
            "DD/MM/YYYY"
          )}</h2><hr/>`;
        erros.forEach((erro) => {
          message =
            message +
            `<p><b>ID Erro:</b> ${erro.id}</p>` +
            `<p><b>Data início:</b> ${erro.inicio}</p>` +
            `<p><b>Data fim:</b> ${erro.fim}</p>` +
            `<p><b>Nome:</b> ${erro.nome}</p>` +
            `<p><b>Status:</b> ${erro.status}</p><hr/>`;
        });
        message =
          message +
          `<p><i>E-mail enviado ${moment().format(
            "DD/MM/YYYY HH:mm:ss"
          )}</i></p>`;
        // Enviando e-mail
        await envioEmail(titulo, message);
      } else {
        console.log("Sem erros registrados no CPI");
      }
    } catch (erro) {
      console.log(erro);
    }
  },
  null,
  false,
  "America/Sao_Paulo"
);

module.exports = {
  cronIncidentes,
  cronCertificados,
  cronErros,
};
