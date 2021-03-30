const routes = require("express").Router();
const swaggerUi = require("swagger-ui-express");

const ParceiroController = require("./controllers/ParceiroController");
const PlataformaController = require("./controllers/PlataformaController");
const ServicoController = require("./controllers/ServicoController");

// Documentação Swagger
const swaggerDoc = require("./config/swagger.json");
routes.use("/", swaggerUi.serve);
routes.get("/", swaggerUi.setup(swaggerDoc));

// Rotas de parceiros
routes.get(
  "/parceiros", 
  ParceiroController.index);
routes.get(
  "/parceiros/:id", 
  ParceiroController.find);
routes.post(
  "/parceiros", 
  ParceiroController.store);
routes.put(
  "/parceiros/:id", 
  ParceiroController.update);
routes.delete(
  "/parceiros/:id", 
  ParceiroController.delete);

// Rotas de plataformas
routes.get(
  "/plataformas", 
  PlataformaController.index);
routes.get(
  "/plataformas/:id", 
  PlataformaController.find);
routes.post(
  "/plataformas", 
  PlataformaController.store);
routes.put(
  "/plataformas/:id", 
  PlataformaController.update);
routes.delete(
  "/plataformas/:id", 
  PlataformaController.delete);

// Rotas de serviços
routes.get(
  "/servicos", 
  ServicoController.index);
routes.get(
  "/servicos/:id", 
  ServicoController.find);
routes.post(
  "/servicos", 
  ServicoController.store);
routes.put(
  "/servicos/:id", 
  ServicoController.update);
routes.delete(
  "/servicos/:id", 
  ServicoController.delete);

module.exports = routes;
