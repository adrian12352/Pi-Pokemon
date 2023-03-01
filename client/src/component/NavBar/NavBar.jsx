import reloadimg from "../../Imagenes/reaload.png";

import "../NavBar/NavBar.css";

import img1 from "../../Imagenes/pokebola.png";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <header className="nav_container">
      <Link to="/">
        <div className="bnbreload">
          <img src={img1} className="nav_img" alt="pokeball" />
        </div>
      </Link>

      <div className="right-side">
        <NavLink to="/create" className="createBtn">
          <button className="navBtn">
            <span className="navBtn_content"> Crear Pokemon</span>
          </button>
        </NavLink>
        <div className="reload" onClick={handleClick}>
          <img src={reloadimg} alt="" />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
