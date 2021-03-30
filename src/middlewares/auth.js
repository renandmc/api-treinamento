const jwt = require('jsonwebtoken');
const moment = require('moment');

const Usuario = require('../models/Usuario');
const SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      erro: 'Sem token na requisição'
    });
  }
  const parts = authHeader.split(' ');
  if (!parts.length === 2) {
    return res.status(401).json({
      erro: 'Erro no token'
    });
  }
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({
      erro: 'Token fora do formato (Bearer <token>)'
    });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = await Usuario.findByPk(decoded.sub, {
      attributes: {
        exclude: ['senha', 'criado', 'atualizado']
      }
    });
    return next();
  } catch (erro) {
    if (erro.name === 'TokenExpiredError') {
      console.log(`Token expirado em ${moment(erro.expiredAt).format('DD/MM/YYYY HH:mm')}`);
      return res.status(401).json({
        erro: 'Token expirado',
        expirado: moment(erro.expiredAt).format('DD/MM/YYYY HH:mm')
      });
    }
    console.log(erro);
    return res.status(401).json({
      erro: 'Token inválido'
    });
  }
}