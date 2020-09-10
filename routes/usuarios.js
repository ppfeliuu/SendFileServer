const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariosController");
const { check } = require("express-validator");

router.post(
  "/",
  [check("nombre", "El nombre es obligatorio").not().isEmpty()],
  [check("email", "Agrega email válido").isEmail()],
  [
    check(
      "password",
      "El password debe ser al menos de 5 caracteres"
    ).isLength({ min: 5 }),
  ],
  usuarioController.nuevoUsuario
);

module.exports = router;
