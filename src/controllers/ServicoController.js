const validations = require("../utils/sequelize-validations");
const Plataforma = require("../models/Plataforma");
const Servico = require("../models/Servico");

module.exports = {
  async index(req, res) {
    try {
      const servicos = await Servico.findAll({
        include: [{
          association: "plataforma",
          attributes: ['nome']
        }]
      });
      return res.json(servicos);
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao listar serviços",
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
      const servico = await Servico.findByPk(id, {
        include: [{
          association: "plataforma",
          attributes: ['nome']
        }]
      });
      if (!servico) {
        return res.status(404).json({
          erro: `Serviço com id ${id} não encontrado`,
        });
      }
      return res.json(servico);
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao listar serviço",
      });
    }
  },
  async store(req, res) {
    try {
      const plataforma_id = parseInt(req.body.plataforma_id);
      if (isNaN(plataforma_id)) {
        return res.status(400).json({
          erro: "ID de plataforma deve ser um número inteiro",
        });
      }
      const plataforma = await Plataforma.findByPk(plataforma_id);
      if (!plataforma) {
        return res.status(404).json({
          erro: `Plataforma com id ${plataforma_id} não encontrada`,
        });
      }
      const {
        nome,
        tipo,
        sizing,
        trafego,
        usuarios,
        unidade_sizing,
        unidade_trafego,
        unidade_usuarios,
        status,
      } = req.body;
      const servico = await Servico.create({
        nome,
        sizing,
        trafego,
        usuarios,
        unidade_sizing,
        unidade_trafego,
        unidade_usuarios,
        tipo,
        status,
        plataforma_id,
      });
      return res.status(201).json({
        sucesso: "Serviço criado com sucesso",
        servico
      });
    } catch (erro) {
      const erros = validations(erro);
      if (erros.validation) {
        return res.status(400).json({
          erro: erros.erros,
        });
      }
      return res.status(500).json({
        servicos: "Erro ao criar serviço",
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
      const servico = await Servico.findByPk(id);
      if (!servico) {
        return res.status(404).json({
          erro: `Serviço com id ${id} não encontrado`,
        });
      }
      const plataforma_id = parseInt(req.body.plataforma_id) || servico.plataforma_id;
      if (isNaN(plataforma_id)) {
        return res.status(400).json({
          erro: "ID de plataforma deve ser um número inteiro",
        });
      }
      const plataforma = await Plataforma.findByPk(plataforma_id);
      if (!plataforma) {
        return res.status(404).json({
          erro: `Plataforma com id ${plataforma_id} não encontrada`,
        });
      }
      servico.nome = req.body.nome || servico.nome;
      servico.tipo = req.body.tipo || servico.tipo;
      servico.sizing = req.body.sizing || servico.sizing;
      servico.trafego = req.body.trafego || servico.trafego;
      servico.usuarios = req.body.usuarios || servico.usuarios;
      servico.unidade_sizing = req.body.unidade_sizing || servico.unidade_sizing;
      servico.unidade_trafego = req.body.unidade_trafego || servico.unidade_trafego;
      servico.unidade_usuarios = req.body.unidade_usuarios || servico.unidade_usuarios;
      servico.status = req.body.status || servico.status;
      servico.plataforma_id = plataforma_id;
      await servico.save();
      return res.json({
        sucesso: "Serviço atualizado com sucesso",
        servico
      });
    } catch (erro) {
      const erros = validations(erro);
      if (erros.validation) {
        return res.status(400).json({
          erro: erros.erros,
        });
      }
      return res.status(500).json({
        erro: "Erro ao atualizar serviço",
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
      const servico = await Servico.findByPk(id);
      if (!servico) {
        return res.status(404).json({
          erro: `Serviço com id = ${id} não encontrado`,
        });
      }
      await servico.destroy();
      return res.json({
        sucesso: "Serviço excluído com sucesso",
      });
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao excluir serviço",
      });
    }
  },
};