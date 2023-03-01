import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "../LandingPage/LandingPage.css";
import img1 from "../../Imagenes/pokebola.png";
import title_img from "../../Imagenes/poke-title.png";

const LandingPage = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/home");
  };

  return (
    <div className="container">
      <div className="landing-title">
        <img src={title_img} alt="" />
      </div>

      <div className="play">
        <img className="landing-img" src={img1} alt="" />

        <button className="enter-btn" onClick={handleClick}>
          <span className="button-content">Inicio</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
