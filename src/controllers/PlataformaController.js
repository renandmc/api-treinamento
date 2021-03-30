const validations = require("../utils/sequelize-validations");
const Plataforma = require("../models/Plataforma");

module.exports = {
  async index(req, res) {
    try {
      const plataformas = await Plataforma.findAll();
      return res.json(plataformas);
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao listar plataformas",
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
      const plataforma = await Plataforma.findByPk(id);
      if (!plataforma) {
        return res.status(404).json({
          erro: `Plataforma com id ${id} não encontrada`,
        });
      }
      return res.json(plataforma);
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao listar plataforma",
      });
    }
  },
  async store(req, res) {
    try {
      const { nome, tipo, status } = req.body;
      const plataforma = await Plataforma.create({
        nome,
        tipo,
        status,
      });
      return res.status(201).json({
        sucesso: "Plataforma criada com sucesso",
        plataforma
      });
    } catch (erro) {
      const erros = validations(erro);
      if (erros.validation) {
        return res.status(400).json({
          erro: erros.erros,
        });
      }
      return res.status(500).json({
        erro: "Erro ao cadastrar plataforma",
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
      const plataforma = await Plataforma.findByPk(id);
      if (!plataforma) {
        return res.status(404).json({
          erro: `Plataforma com id ${id} não encontrada`,
        });
      }
      plataforma.nome = req.body.nome || plataforma.nome;
      plataforma.tipo = req.body.tipo || plataforma.tipo;
      plataforma.status = req.body.status || plataforma.status;
      await plataforma.save();
      return res.json({
        sucesso: "Plataforma atualizada com sucesso",
        plataforma
      });
    } catch (erro) {
      const erros = validations(erro);
      if (erros.validation) {
        return res.status(400).json({
          erro: erros.erros,
        });
      }
      return res.status(500).json({
        erro: "Erro ao atualizar plataforma",
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
      const plataforma = await Plataforma.findByPk(id);
      if (!plataforma) {
        return res.status(404).json({
          erro: `Plataforma com id ${id} não encontrada`,
        });
      }
      await plataforma.destroy();
      return res.json({
        sucesso: "Plataforma excluída com sucesso",
      });
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao excluir plataforma",
      });
    }
  },
};
