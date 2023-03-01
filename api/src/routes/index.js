const { Router } = require("express");
const {
  getPokemons,
  createPokemon,
  getPokemonById,
} = require("../controllers/PokemonController.js");
const { getAllTypes } = require("../controllers/TypeController.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokemons);
router.get("/pokemons/:id", getPokemonById);
router.post("/pokemons", createPokemon);

router.get("/types", getAllTypes);

module.exports = router;
