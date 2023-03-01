import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypes, PostPokemons } from "../../redux/actions/index.js";
import s from "./style.module.css";

import NavBar from "../NavBar/NavBar.jsx";
import styles from "./CreatePokemon.module.css";
import Validate from "./Validate.jsx";
import { spanishTypes } from "../../utils.js";

function CreatePokemon() {
  const history = useHistory();
  const dispatch = useDispatch();

  const typesPoke = useSelector((state) => state.pokemosType);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: undefined,
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      Validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (e.target.value === "Select") {
      return;
    }
    if (input.types.length > 1) {
      return;
    }
    if (input.types.includes(e.target.value)) {
      return "ya existe ese tipo";
    } else
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    setErrors(
      Validate({
        ...input,
        types: [...input.types, e.target.value],
      })
    );
  }

  function handleDeletTypes(tipe) {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== tipe),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.keys(errors).length !== 0) {
      alert('There are still errors, " Please try again "');
    } else {
      dispatch(PostPokemons(input));

      alert("Successfully created Pokemon");
      history.push("/home");
    }
  }
  console.log(input.types);
  console.log(errors);

  return (
    <div className={s.wraper}>
      <NavBar />
      <div className={s.container}>
        <div className={s.title}>POKEMON</div>
        <div className={s.content}>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className={s.user_details}>
              <div className={s.input_box}>
                <span className={s.details}>Nombre</span>
                {errors.name && (
                  <span className={s.error}>{errors.name} *</span>
                )}
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  maxLength="20"
                  required
                />
              </div>

              <div className={s.input_box}>
                <span className={s.details}>Image: </span>
                {errors.image && (
                  <span className={s.error}>{errors.image} *</span>
                )}
                <input
                  type="text"
                  name="image"
                  value={input.image}
                  onChange={handleChange}
                />
              </div>

              <div className={s.input_box}>
                <span className={s.details}>Vida: </span>
                {errors.hp && <span className={s.error}> {errors.hp} *</span>}
                <input
                  type="number"
                  name="hp"
                  value={input.hp}
                  onChange={handleChange}
                  placeholder="1 - 99pts"
                />
              </div>

              <div className={s.input_box}>
                <span className={s.details}>Ataque: </span>
                {errors.attack && (
                  <span className={s.error}> {errors.attack} *</span>
                )}
                <input
                  type="number"
                  name="attack"
                  value={input.attack}
                  onChange={handleChange}
                  placeholder="1 -150pts"
                />
              </div>

              {/*  */}

              <div className={s.input_box}>
                <span className={s.details}>Defensa: </span>
                {errors.defense && (
                  <span className={s.error}> {errors.defense} *</span>
                )}
                <input
                  type="number"
                  name="defense"
                  value={input.defense}
                  onChange={handleChange}
                  placeholder="1 - 150pts"
                />
              </div>

              {/*  */}

              <div className={s.input_box}>
                <span className={s.details}>Velocidad: </span>
                {errors.speed && (
                  <span className={s.error}> {errors.speed} *</span>
                )}
                <input
                  type="number"
                  name="speed"
                  value={input.speed}
                  onChange={handleChange}
                  placeholder="1 - 70pts"
                />
              </div>

              {/*  */}

              <div className={s.input_box}>
                <span className={s.details}>Altura: </span>
                {errors.height && (
                  <span className={s.error}> {errors.height} *</span>
                )}
                <input
                  type="number"
                  name="height"
                  value={input.height}
                  onChange={handleChange}
                  placeholder="1 - 180"
                />
              </div>

              {/*  */}

              <div className={s.input_box}>
                <span className={s.details}>Peso: </span>
                {errors.weight && (
                  <span className={s.error}> {errors.weight} *</span>
                )}
                <input
                  type="number"
                  name="weight"
                  value={input.weight}
                  onChange={handleChange}
                  placeholder="1 - 200lbs"
                />
              </div>

              {/*  */}

              <div className={s.input_box}>
                <span className={s.details}>Tipo: </span>
                {errors.types && (
                  <span className={s.error}> {errors.types} *</span>
                )}
                <div className={s.content_select}>
                  <select onChange={(e) => handleSelect(e)}>
                    <option value="Select">Todos</option>

                    {typesPoke &&
                      typesPoke.map((p, index) => (
                        <option
                          key={index}
                          value={p.name}
                          className={s.options}
                        >
                          {spanishTypes[p.name]}
                        </option>
                      ))}
                  </select>
                  <i></i>
                </div>
              </div>

              {/*  */}

              <div className={s.typeContainer}>
                {input.types?.map((tipe) => (
                  <div className={s.typeElement} key={tipe}>
                    {" "}
                    <button
                      className={styles}
                      onClick={() => handleDeletTypes(tipe)}
                    >
                      X
                    </button>
                    <span>{spanishTypes[tipe]}</span>
                  </div>
                ))}
              </div>

              {/*  */}
              <div className={s.btn_container}>
                <Link to="/home">
                  <div className={s.submit_btn}>
                    <input type="submit" value="Volver" />
                  </div>
                </Link>

                <div className={s.submit_btn}>
                  <input type="submit" value="Crear" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePokemon;
