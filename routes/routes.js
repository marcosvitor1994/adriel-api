const { Router, json } = require("express");
const authMidd = require("../middlewares/auth.js");

const { AdminModel } = require("../models/users.js");

const LoginController = require("../controllers/loginController")
const UserController = require("../controllers/userController");
const userController = require("../controllers/userController");

const routes = new Router();

// Login
routes.post("/login", LoginController.login);

// user
routes.get("/list", userController.list)
routes.post("/user", userController.create);
routes.get("/user/:id", authMidd(["Admin"]), userController.listOne);
routes.put("/user/:id", authMidd(["Admin"]), userController.update);
routes.delete("/user/:id", authMidd(["Admin"]), userController.delete);


// lista usuários
routes.get("/users", (req, res) => {
    const { nome, sexo, email, _role } = req.query;
    UserModel.find(JSON.parse(JSON.stringify({ nome, sexo, email, _role })))
      .select("-senha")
      .then((users) => {
        res.json(users);
      });
  });


routes.get("/", (req, res, next) => {
  res.status(200).json({
    status: "Sucess",
    msg: "Secom tá ON!",
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