const axios = require('axios');

const CPI_BASEURL = 'https://d8ed4b30trial.it-cpitrial.cfapps.us10.hana.ondemand.com/api/v1/';
const CPI_ERROS_URL = `${CPI_BASEURL}MessageProcessingLogs`;
const CPI_CERTIFICADOS_URL = `${CPI_BASEURL}KeystoreEntries`;

const CPI_USER = 'renan.ciciliato@lab4e.com.br';
const CPI_PASS = '@renandmc93';

const CPI_AUTH = `Basic ${Buffer.from(`${CPI_USER}:${CPI_PASS}`).toString('base64')}`;

const errosCPI = async (filtro) => {
  const { data } = await axios.get(CPI_ERROS_URL, {
    params: {
      '$filter': filtro
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': CPI_AUTH
    }
  });
  let erros = data.d.results;
  erros = erros.map(erro => {
    const nome = erro.IntegrationFlowName;
    const data_inicio = moment(parseInt(erro.LogStart.split('(')[1].split(')')[0])).format('DD/MM/YYYY');
    const data_fim = moment(parseInt(erro.LogEnd.split('(')[1].split(')')[0])).format('DD/MM/YYYY');
    const status = erro.Status;
    const solucao = null;
    return {
      nome,
      solucao,
      data_inicio,
      data_fim,
      status
    }
  });
  return {
    num_erros: erros.length,
    erros
  }
}

const certificadosCPI = async () => {

}

module.exports = errosCPI, certificadosCPI;