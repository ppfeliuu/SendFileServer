const Enlaces = require("../models/Enlace");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.nuevoEnlace = async (req, res, next) => {
  //Errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Save in DDBB
  const { nombre_original } = req.body;

  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;

  //if user is auth
  if (req.usuario) {
    const { password, descargas } = req.body;

    //Asign to link download numbers
    if (descargas) {
      enlace.descargas = descargas;
    }

    //asign a pass
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }

    enlace.autor = req.usuario.id;
  }

  try {
    await enlace.save();
    res.json({ msg: `${enlace.url}` });
    return next();
  } catch (error) {}
  console.log(error);
};

exports.obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;

  //Check link
  const enlace = await Enlaces.findOne({ url });

  if (!enlace) {
    res.status(404).json({ msg: "Enlace no existe" });
    return next();
  }

  res.json({ archivo: enlace.nombre });

  //si descargar === 1 eliminar
  const { descargas, nombre } = enlace;

  if (descargas === 1) {
    req.archivo = nombre;

    await Enlaces.findOneAndRemove(req.params.url);
    next();
  } else {
    enlace.descargas--;
    await enlace.save();
  }
};