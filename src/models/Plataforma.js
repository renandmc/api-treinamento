const { Model, DataTypes } = require("sequelize");

class Plataforma extends Model {
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
          type: DataTypes.STRING,
          allowNull: true
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
        tableName: "plataformas",
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
    this.hasMany(models.Servico, {
      as: "servicos",
      foreignKey: "plataforma_id",
    });
  }
}

module.exports = Plataforma;
