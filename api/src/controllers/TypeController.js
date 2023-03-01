const axios = require("axios");
const { Type } = require("../db.js");

const getAllTypes = async (req, res) => {
  const dbData = await Type.findAll();

  if (dbData.length === 0) {
    try {
      const types = await axios.get("https://pokeapi.co/api/v2/type");
      console.time("Execution Time");
      const typesName = types.data.results.map((el) => {
        return { name: el.name };
      });
      await Type.bulkCreate(typesName).then(() =>
        console.log("Tipos guardados correctamente")
      );
      console.timeEnd("Execution Time");

      const info = await Type.findAll();
      const result = info.map((el) => el.dataValues);
      // console.log(result);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error.message);
      return res
        .status(404)
        .send("Ocurrió un Error en modulo: TypeController ");
    }
  } else {
    return res.status(200).json(dbData);
  }
};

module.exports = {
  getAllTypes,
};
