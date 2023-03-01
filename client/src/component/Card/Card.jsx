import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import imgLink from "../../Imagenes/external-link.svg";
import { spanishTypes } from "../../utils";

function Card({ name, types, image, id }) {
  let typeSpanish = types.map((el) => spanishTypes[el.trim()] + " ");
  return (
    <div className="card">
      <h2 className="card-title">{name}</h2>

      <Link to={`/pokemons/${id}`}>
        <img className="card-img" src={image} alt="imagen pokemon" />
        <div className="layer">
          <img src={imgLink} alt="" />
        </div>
      </Link>

      <h3 className="card-types">Tipo: {typeSpanish}</h3>
    </div>
  );
}

export default Card;
