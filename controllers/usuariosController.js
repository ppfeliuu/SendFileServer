const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
exports.nuevoUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { email, password } = req.body;

  let usuario = await Usuario.findOne({ email });

  if (usuario) {
    return res.status(400).json({ msg: "Usuario ya está registrado" });
  }

  usuario = new Usuario(req.body);
  //hash pass
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  try {
    await usuario.save();
    res.json({ msg: "Usuario creado con éxito" });
  } catch (error) {
    console.log(error);
  }
};
