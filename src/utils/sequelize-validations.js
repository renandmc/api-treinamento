const {
  ValidationError
} = require("sequelize");

function validationErrors(erro) {
  if (erro instanceof ValidationError) {
    let erros = {};
    erro.errors.forEach(erro => {
      erros[erro.path] = erro.message
    });
    console.log(erros);
    return {
      validation: true,
      erros
    };
  } else {
    console.log(erro);
    return {
      validation: false
    }
  }
}

module.exports = validationErrors;