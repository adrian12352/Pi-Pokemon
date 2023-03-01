const { allPokemons, allPokemonsId } = require("../utils");
const { Pokemon, Type } = require("../db.js");

const getPokemons = async (req, res, next) => {
  try {
    const { name } = req.query;
    const totalPokemon = await allPokemons(); // Esta funcion trae los pokemons de la api y la db que vamos a utilizar en front
    if (name) {
      //Revisar si se recibió una query por url con el nombre de un pokemon, los comparamos con el nombre de los que tenemos guardados en la url
      let pokemonName = await totalPokemon.filter(
        (el) => el.name.toLowerCase() === name.toLowerCase()
      );

      if (pokemonName.length) {
        res.status(200).send(pokemonName);
      } else {
        res.status(404).send(`el pokemon ${name} no existe`);
      }
    } else {
      res.status(200).send(totalPokemon);
    }
  } catch (error) {
    next(error);
  }
};

// BÚSQUEDA POR ID
const getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    const infoPokemon = await allPokemonsId(id);
    res.status(200).json(infoPokemon);
  } catch (error) {
    res.status(404).send(`No existe un Pokemon para el id: ${id}`);
  }
};

//-----------CREAR POKEMON----------//
//ifRef = 11000;
const createPokemon = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;

  //Validamos que exista un nombre
  if (!name) {
    res.send("El nombre debe ser ingresado");
  }

  const findPokemon = await Pokemon.findOne({
    where: { name: name.toLowerCase() },
  });

  if (findPokemon) {
    return res.json("Ya existe un pokemon con este nombre");
  }
  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  let dbTypes = await Promise.all(
    types.map((e) => {
      return Type.findOne({ where: { name: e } });
    })
  );

  await newPokemon.addType(dbTypes);

  res.send("pokemon creado");
};

// async function deletPokemon(req, res) {
//     let { id } = req.params
//     try {
//         await Pokemon.destroy({
//             where: {
//                 id,
//             }

//         });
//         res
//             .status(200)
//             .send('Usuario eliminado')
//     } catch (error) {
//         res
//             .status(400)
//             .send("No se pudo eliminar el usuario")
//     }
// }

module.exports = {
  getPokemons,
  createPokemon,
  getPokemonById,
  //    deletPokemon
};
