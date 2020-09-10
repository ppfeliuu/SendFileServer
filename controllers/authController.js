const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

exports.autenticarUsuario = async (req, res, next) => {
  //Errores
  // Buscar usuario
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  // console.log(usuario);

  if (!usuario) {
    res.status(401).json({ msg: "Usuario no existe" });
    return next();
  }

  //Verifica usuario y pass
  if (bcrypt.compareSync(password, usuario.password)) {
    //Crear JWT
  } else {
    res.status(401).json({ msg: "Password incorrecto" });
    return next();
  }
};

exports.usuarioAutenticado = async (req, res) => {};
