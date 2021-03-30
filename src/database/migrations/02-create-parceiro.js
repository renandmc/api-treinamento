"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("parceiros", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING(50),
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
    return queryInterface.dropTable("parceiros");
  },
};
