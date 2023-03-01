import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getById, clearDetail } from "../../redux/actions/index.js";
import { spanishTypes } from "../../utils.js";

import s from "../DetailsPokemon/DetailsPokemon.module.css";
import NavBar from "../NavBar/NavBar.jsx";

function DetailsPokemon() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const detailspoke = useSelector((state) => state.pokemonsId);

  useEffect(() => {
    dispatch(getById(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch]);

  return (
    <>
      <NavBar></NavBar>
      <div className={s.containermaster}>
        <div className={s.title}>
          <label className={s.titlename}>{detailspoke.name}</label>

          <div className={s.titletype}>
            Tipo:
            <span className={s.statname}>
              {detailspoke.types
                ? detailspoke.types
                    .map((e) => "    " + spanishTypes[e])
                    .join(" - ")
                : detailspoke.types}
            </span>
          </div>
        </div>

        <div className={s.container}>
          <div className={s.img}>
            <img src={detailspoke.image} alt="" />
          </div>

          <div className={s.stat}>
            <label className={s.titlesStats}>
              Id: <span className={s.statname}>{detailspoke.id}</span>
            </label>
            <span className={s.titleStat}>ESTADÍSTICAS </span>
            <div className={s.substat}>
              <label className={s.titlesStats}>
                VIDA: <span className={s.statname}>{detailspoke.hp}</span>
              </label>
              <label className={s.titlesStats}>
                ATAQUE: <span className={s.statname}>{detailspoke.attack}</span>
              </label>
              <label className={s.titlesStats}>
                DEFENSA:
                <span className={s.statname}>{detailspoke.defense}</span>
              </label>
              <label className={s.titlesStats}>
                VELOCIDAD:
                <span className={s.statname}>{detailspoke.speed}</span>
              </label>
              <label className={s.titlesStats}>
                ALTURA:<span className={s.statname}>{detailspoke.height}</span>
              </label>
              <label className={s.titlesStats}>
                PESO:<span className={s.statname}>{detailspoke.weight}</span>
              </label>
            </div>
          </div>
        </div>
        <Link to="/home">
          <div className={s.submit_btn}>
            <input type="submit" value="Volver" />
          </div>
        </Link>
      </div>
    </>
  );
}

export default DetailsPokemon;
