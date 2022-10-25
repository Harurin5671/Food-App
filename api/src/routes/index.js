const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require("./recipes.js");
const diets = require("./diets");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", recipes);
router.use("/", diets);

module.exports = router;
