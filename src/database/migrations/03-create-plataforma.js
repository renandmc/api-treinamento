"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("plataformas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: "A",
      },
      tipo: {
        type: Sequelize.STRING
      },
      criado: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      atualizado: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("plataformas");
  },
};
