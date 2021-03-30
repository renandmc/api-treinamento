const validations = require("../utils/sequelize-validations");
const Parceiro = require("../models/Parceiro");

module.exports = {
  async index(req, res) {
    try {
      const parceiros = await Parceiro.findAll({
        order: [["nome", "ASC"]]
      });
      return res.json(parceiros);
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao listar parceiros",
      });
    }
  },
  async find(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID deve ser um número inteiro",
        });
      }
      const parceiro = await Parceiro.findByPk(id);
      if (!parceiro) {
        return res.status(404).json({
          erro: `Parceiro com id ${id} não encontrado`,
        });
      }
      return res.json(parceiro);
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao listar parceiro",
      });
    }
  },
  async store(req, res) {
    try {
      const { nome, tipo, status } = req.body;
      const parceiro = await Parceiro.create({
        nome,
        tipo,
        status
      });
      return res.status(201).json({
        sucesso: "Parceiro criado com sucesso",
        parceiro
      });
    } catch (erro) {
      const erros = validations(erro);
      if (erros.validation) {
        return res.status(400).json({
          erro: erros.erros,
        });
      }
      return res.status(500).json({
        erro: "Erro ao cadastrar parceiro",
      });
    }
  },
  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID deve ser um número inteiro",
        });
      }
      const parceiro = await Parceiro.findByPk(id);
      if (!parceiro) {
        return res.status(404).json({
          erro: `Parceiro com id ${id} não encontrado`,
        });
      }
      parceiro.nome = req.body.nome || parceiro.nome;
      parceiro.tipo = req.body.tipo || parceiro.tipo;
      parceiro.status = req.body.status || parceiro.status;
      await parceiro.save();
      return res.json({
        sucesso: "Parceiro atualizado com sucesso",
        parceiro
      });
    } catch (erro) {
      const erros = validations(erro);
      if (erros.validation) {
        return res.status(400).json({
          erro: erros.erros,
        });
      }
      return res.status(500).json({
        erro: "Erro ao atualizar parceiro",
      });
    }
  },
  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID deve ser um número inteiro",
        });
      }
      const parceiro = await Parceiro.findByPk(id);
      if (!parceiro) {
        return res.status(404).json({
          erro: `Parceiro com id ${id} não encontrado`,
        });
      }
      await parceiro.destroy();
      return res.json({
        sucesso: "Parceiro excluído com sucesso",
      });
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao excluir parceiro",
      });
    }
  },
};
