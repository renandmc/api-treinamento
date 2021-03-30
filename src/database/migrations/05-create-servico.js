"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("servicos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      plataforma_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "plataformas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      tipo: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      sizing: Sequelize.STRING(100),
      unidade_sizing: Sequelize.STRING(50),
      trafego: Sequelize.STRING(100),
      unidade_trafego: Sequelize.STRING(50),
      usuarios: Sequelize.STRING(100),
      unidade_usuarios: Sequelize.STRING(50),
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
    return queryInterface.dropTable("servicos");
  },
};
