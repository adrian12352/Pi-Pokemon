//REDUX
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions/index.js";
//COMPONENTES
import NavBar from "../NavBar/NavBar.jsx";
import Card from "../Card/Card.jsx";
import PagesButton from "../PagesButton/PagesButton.jsx";
import Filtros from "../Filters/Filter.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import Loading from "../Loading/Loading.jsx";
//ESTILOS
import s from "../Home/Home.module.css";
import arrowImg from "../../Imagenes/arrow-up.png";
import SearchBar from "../SearchBar/SearchBar.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  const [pagCurrent, setpagCurrent] = useState(1); // mi pagina actual es 1
  const [pokemonsPerPag] = useState(12); // cantidad de pokemons por pagian 12

  const indexLastPoke = pagCurrent * pokemonsPerPag; //el ultimo pokemon por pag va a ser  pagina actual por cant. de pokemons 12

  const indexFirsPoke = indexLastPoke - pokemonsPerPag; //el primer pokemon por pag va a ser indice del ultimo pokemon menos pokmeon por pag

  const pokemosCurrents = pokemons.slice(indexFirsPoke, indexLastPoke);

  const [loading, setLoading] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  const paginado = (numberPag) => {
    setpagCurrent(numberPag);
  };

  if (pokemosCurrents.length > 0 && loading) {
    setLoading(false);
  }

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  // const handleScroll = (e) => {
  //   setScrollTop(e.currentTarget.scrollTop);
  //   console.log(scrollTop);
  // };
  useEffect(() => {
    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={s.container}>
      <NavBar className={s.header} />
      <Filtros setpage={setpagCurrent} />
      <SearchBar />
      <PagesButton
        pokemonsPerPag={pokemonsPerPag}
        pokemons={pokemons.length}
        paginado={paginado}
      />
      <div className={s.listCard}>
        {pokemosCurrents.length > 0 && !loading ? (
          pokemosCurrents &&
          pokemosCurrents.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                name={e.name.toUpperCase()}
                image={e.image}
                types={e.types.map((el) => " " + el)}
              />
            );
          })
        ) : !pokemosCurrents.length > 0 && loading ? (
          <Loading></Loading>
        ) : (
          <NotFound></NotFound>
        )}
      </div>
      <a href="#">
        <img
          src={arrowImg}
          className={scrollTop > 100 ? "topButton appear" : "topButton"}
          id="Arrow"
          alt=""
        />
      </a>
    </div>
  );
};

export default Home;
