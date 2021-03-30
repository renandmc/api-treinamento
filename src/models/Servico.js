const { Model, DataTypes } = require("sequelize");

class Servico extends Model {
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
        sizing: {
          type: DataTypes.STRING(100),
          allowNull: true,
          validate: {
            len: {
              args: [0, 100],
              msg: "Sizing deve ter no máximo 100 caracteres",
            },
          },
        },
        unidade_sizing: {
          type: DataTypes.STRING(10),
          allowNull: true,
          validate: {
            len: {
              args: [0, 10],
              msg: "unidade_sizing deve ter no máximo 10 caracteres",
            },
          },
        },
        trafego: {
          type: DataTypes.STRING(100),
          allowNull: true,
          validate: {
            len: {
              args: [0, 100],
              msg: "Tráfego deve ter no máximo 100 caracteres",
            },
          },
        },
        unidade_trafego: {
          type: DataTypes.STRING(10),
          allowNull: true,
          validate: {
            len: {
              args: [0, 10],
              msg: "unidade_trafego deve ter no máximo 10 caracteres",
            },
          },
        },
        usuarios: {
          type: DataTypes.STRING(100),
          allowNull: true,
          validate: {
            len: {
              args: [0, 100],
              msg: "Usuários deve ter no máximo 100 caracteres",
            },
          },
        },
        unidade_usuarios: {
          type: DataTypes.STRING(10),
          allowNull: true,
          validate: {
            len: {
              args: [0, 10],
              msg: "unidade_usuarios deve ter no máximo 10 caracteres",
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
        tableName: "servicos",
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
    this.belongsTo(models.Plataforma, {
      foreignKey: "plataforma_id",
      as: "plataforma",
    });
  }
}

module.exports = Servico;
