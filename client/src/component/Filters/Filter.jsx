import React, { useState } from "react";
import { useEffect } from "react";
import {
  getTypes,
  filterByType,
  filterByOrigin,
  filterAscDes,
  filterByAttack,
} from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";

import { spanishTypes } from "../../utils";

import { getByName } from "../../redux/actions/index.js";
import "./Filter.css";

function Filtros({ setpage }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const [name, setName] = useState("");

  const allpoke = useSelector((state) => state.copyPokemos);
  const allpokefilterd = useSelector((state) => state.pokemons);
  const poketypes = useSelector((state) => state.pokemosType);

  function handleFilterByType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value, allpoke));
    setpage(1);
  }

  function handleFilterByOrigi(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value, allpoke));
    setpage(1);
  }
  function handleFilterAscDes(e) {
    if (e.target.value === "All") {
      return;
    }
    e.preventDefault();
    dispatch(filterAscDes(e.target.value, allpokefilterd));
    setpage(1);
  }

  function handleFilterPower(e) {
    if (e.target.value === "Select") {
      return;
    }
    e.preventDefault();
    dispatch(filterByAttack(e.target.value, allpokefilterd));
    setpage(1);
  }

  // function handleChance(e) {
  //   e.preventDefault();
  //   setName(e.target.value);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   dispatch(getByName(name));
  //   setName("");
  //   setpage(1);
  // }

  return (
    <div className="filter-container">
      <div className="divTitle">
        <h3>Filtros</h3>
      </div>

      <div className="list-item">
        <label>Tipo: </label>
        <div className="content-select">
          <select onChange={handleFilterByType}>
            <option value="All">Todos</option>

            {poketypes &&
              poketypes.map((p, index) => (
                <option key={index} value={p.name} className="options">
                  {spanishTypes[p.name]}
                </option>
              ))}
          </select>
          <i></i>
        </div>
      </div>

      <div className="list-item">
        <label>Creados en: </label>
        <div className="content-select">
          <select onChange={handleFilterByOrigi}>
            <option value="All">Todos</option>
            <option value="ByAPI">Api</option>
            <option value="createdInDb">Base de Datos</option>
          </select>
          <i></i>
        </div>
      </div>

      <div className="list-item">
        <label>Nombre: </label>
        <div className="content-select">
          <select onChange={handleFilterAscDes}>
            <option value="All">Todos</option>
            <option value="Asc">A - Z</option>
            <option value="Des">Z - A</option>
          </select>
          <i></i>
        </div>
      </div>

      <div className="list-item">
        <label>Ataque: </label>
        <div className="content-select">
          <select onChange={(e) => handleFilterPower(e)}>
            <option value="Select">Ataque</option>
            <option value="MaxPower">Alto</option>
            <option value="MinPower">Bajo</option>
          </select>
          <i></i>
        </div>
      </div>
    </div>
  );
}
export default Filtros;
