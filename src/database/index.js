const Sequelize = require("sequelize");

const dbConfig = require("../config/database");

const Parceiro = require("../models/Parceiro");
const Plataforma = require("../models/Plataforma");
const Servico = require("../models/Servico");

const connection = new Sequelize(dbConfig);

Parceiro.init(connection);
Plataforma.init(connection);
Servico.init(connection);

Parceiro.associate(connection.models);
Plataforma.associate(connection.models);
Servico.associate(connection.models);

module.exports = connection;
