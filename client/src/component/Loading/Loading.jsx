import React from "react";
import s from "../Loading/Loading.module.css";
import "./Loading.css";
import pokedex from "../../Imagenes/pokedex.png";
function Loading() {
  return (
    <div className="loading-center">
      <div className="pulse">
        <img src={pokedex} alt="" />
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );

  // return (
  //   <div className={s.conteiner}>
  //     <div className={s.containersecond}></div>
  //     <div className={s.containerthird}>
  //       <h1>CARGANDO</h1>
  //       <span className={s.loader}></span>
  //     </div>
  //     <div className={s.containersecond}></div>
  //   </div>
  // );
}

export default Loading;
