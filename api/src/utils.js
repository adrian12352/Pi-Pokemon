const { Pokemon, Type } = require("./db");

const axios = require("axios");

const URL_API = "https://pokeapi.co/api/v2/pokemon?limit=151";

// POKEMONS DE LA API

const pokemonsApi = async () => {
  try {
    const pokemonsFromApi = await axios
      .get(URL_API)
      .then((info) => info.data.results)
      .then((results) => Promise.all(results.map((resp) => axios(resp.url))))
      .then((url) => url.map((resp) => resp.data));

    let arrayPokemonApi = pokemonsFromApi.map((el) => {
      return {
        id: el.id,
        name: el.name,
        types: el.types.map((elemento) => elemento.type.name),
        image: el.sprites.other["dream_world"].front_default,
        attack: el.stats[1].base_stat,
        defense: el.stats[2].base_stat,
        speed: el.stats[5].base_stat,
        height: el.height,
        weight: el.weight,
      };
    });

    return arrayPokemonApi;
  } catch (error) {
    console.log("Error en funcion pokemonsApi: " + error.message);
  }
};

//-----POKEMONS DE LA BASE DE DATOS-----//
const pokemonDb = async () => {
  const pokemonDbInfo = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  //Arreglando la información de de los types
  const pokemonDbInfo1 = pokemonDbInfo.map((el) => el.dataValues);
  const pokemonDbInfo2 = pokemonDbInfo1.map((pok) => {
    if (pok.id) {
      pok.types = pok.types.map((el) => el.name);
      return pok;
    }
  });

  return pokemonDbInfo2;
};

//Total de pokemons API y DB
const allPokemons = async () => {
  const apiPokemon = await pokemonsApi();
  const dbPokemon = await pokemonDb();
  const totalPokemon = apiPokemon.concat(dbPokemon);

  return totalPokemon;
};

//-----------BUSCAR POR ID ---------//
const allPokemonsId = async (id) => {
  if (id < 10229) {
    const pokemonsFromApi = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((el) => el.data);

    const pokeId = {
      id: pokemonsFromApi.id,
      name: pokemonsFromApi.name,
      image: pokemonsFromApi.sprites.other["dream_world"].front_default,
      types: pokemonsFromApi.types.map((t) => t.type.name),
      hp: pokemonsFromApi.stats[0].base_stat,
      attack: pokemonsFromApi.stats[1].base_stat,
      defense: pokemonsFromApi.stats[2].base_stat,
      speed: pokemonsFromApi.stats[5].base_stat,
      height: pokemonsFromApi.height,
      weight: pokemonsFromApi.weight,
    };

    return pokeId;
  } else {
    const pokemonDbInfoId = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const pokemonById = pokemonDbInfoId.dataValues;
    pokemonById.types = pokemonById.types.map((el) => el.name);

    return pokemonById;
  }
};

module.exports = {
  allPokemons,
  allPokemonsId,
};
