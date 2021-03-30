module.exports = (req, res, next) => {
  if (req.usuario && req.usuario.grupo === 'admin') {
    return next();
  } else {
    return res.status(403).json({
      grupo: 'Usuário não tem permissão para acesso'
    })
  }
}