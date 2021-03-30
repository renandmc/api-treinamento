const { Model, DataTypes } = require("sequelize");

class Parceiro extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: {
            len: {
              args: [1, 100],
              msg: "Nome deve ter no máximo 100 caracteres",
            },
            notNull: {
              msg: "Nome não pode ser nulo",
            },
            notEmpty: {
              msg: "Nome não pode ser vazio",
            },
          },
        },
        tipo: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            len: {
              args: [1, 50],
              msg: 'Tipo deve ter no máximo 50 caracteres'
            },
            notNull: {
              msg: "Tipo não pode ser nulo",
            },
            notEmpty: {
              msg: "Tipo não pode ser vazio",
            }
          }
        },
        status: {
          type: DataTypes.STRING(1),
          allowNull: false,
          defaultValue: "A",
          validate: {
            notNull: {
              msg: "Status não pode ser nulo",
            },
            notEmpty: {
              msg: "Status não pode ser vazio",
            },
            isIn: {
              args: [["A", "I"]],
              msg: "Status deve ser A - Ativo ou I - Inativo",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "parceiros",
        freezeTableName: true,
        createdAt: "criado",
        updatedAt: "atualizado",
        getterMethods: {
          criado() {
            const criado = this.getDataValue("criado");
            const data = new Date(criado);
            const dia = data.getDate().toString().padStart(2, "0");
            const mes = (data.getMonth() + 1).toString().padStart(2, "0");
            const ano = data.getFullYear();
            const format = `${dia}/${mes}/${ano}`;
            return format;
          },
          atualizado() {
            const atualizado = this.getDataValue("atualizado");
            const data = new Date(atualizado);
            const dia = data.getDate().toString().padStart(2, "0");
            const mes = (data.getMonth() + 1).toString().padStart(2, "0");
            const ano = data.getFullYear();
            const format = `${dia}/${mes}/${ano}`;
            return format;
          },
        },
      }
    );
  }
  static associate(models) {
  }
}

module.exports = Parceiro;
