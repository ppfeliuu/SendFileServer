const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [check("email", "Agrega email válido").isEmail()],
  [check("password", "El password no debe estar vacío").not().isEmpty()],
  authController.autenticarUsuario
);

router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
