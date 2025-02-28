const { Router } = require("express");

const pedidoController = require("../controllers/pedidoController");

const routes = new Router();

// Rotas de pedidos
routes.get("/pedidos", pedidoController.list);
routes.post("/pedido", pedidoController.create);
routes.get("/pedido/:id", pedidoController.listOne);
routes.put("/pedido/:id", pedidoController.update);
routes.delete("/pedido/:id", pedidoController.delete);

routes.get("/", (req, res, next) => {
  res.status(200).json({
    status: "Sucess",
    msg: "Adriel tá ON!",
  });
});

routes.use((req, res, next) => {
  res.status(404).json({
    error: true,
    msg: "Not Found",
  });
});

routes.use((error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    errror: true,
    message: "Internal Server Error",
  });
});

module.exports = routes;