import React from "react";
import "./PagesButton.css";

const Pages = ({ pokemonsPerPag, pokemons, paginado }) => {
  const numbersPag = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPag); i++) {
    numbersPag.push(i);
  }
  console.log(pokemonsPerPag, pokemons, paginado);

  return (
    //nav proporcionar enlaces de navegación
    <nav>
      <ul className="pagination">
        {numbersPag &&
          numbersPag.map((numero) => (
            <li key={numero}>
              <a className="active" href="#" onClick={() => paginado(numero)}>
                {numero}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pages;
