import axios from "axios";
import {
  GET_ALL_POKEMONS,
  GET_BY_ID,
  GET_TYPES,
  GET_BY_NAME,
  FILTER_BY_TYPE,
  FILTER_CREATE_BY,
  FILTER_ASC_DES,
  FILTER_BY_ATTACK,
  CLEAR_DETAIL,
} from "../types/index.js";

export function getAllPokemons() {
  return async function (dispatch) {
    try {
      let json = await axios.get("/pokemons").then((resp) => resp.data);
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: json,
      });
    } catch (error) {
      return alert(
        "Hubo un error al cargar la informacion. Intenta en unos minutos"
      );
    }
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

export function PostPokemons(payload) {
  return async function () {
    try {
      const sendInfo = await axios.post(`/create`, payload);
      return sendInfo;
    } catch (error) {
      alert("Error al enviar datos");
    }
  };
}

export function getById(id) {
  return async function (dispatch) {
    try {
      let json = await axios(`/pokemons/${id}`).then((info) => info.data);
      return dispatch({
        type: GET_BY_ID,
        payload: json,
      });
    } catch (error) {
      throw error;
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    const info = await axios.get("/types");

    return dispatch({
      type: GET_TYPES,
      payload: info.data,
    });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const info = await axios.get(`/pokemons?name=${name}`);
      return dispatch({
        type: GET_BY_NAME,
        payload: info.data,
      });
    } catch (error) {
      alert("Pokemons not foud");
    }
  };
}

export function filterByType(payload, array) {
  return function (dispatch) {
    const FilterType =
      payload === "All"
        ? array
        : array.filter((e) => e.types.includes(payload));
    // e.types[0] === payload ||
    // e.types[1] === payload)

    return dispatch({
      type: FILTER_BY_TYPE,
      payload: [...FilterType],
    });
  };
}

export function filterByOrigin(payload, array) {
  return function (dispatch) {
    const FilterOrigi =
      payload === "All"
        ? array
        : payload === "createdInDb"
        ? array.filter((el) => el.createInDb)
        : array.filter((el) => !el.createInDb);

    return dispatch({
      type: FILTER_CREATE_BY,
      payload: [...FilterOrigi],
    });
  };
}

export function filterAscDes(payload, array) {
  return function (dispatch) {
    const filterOrder =
      payload === "All"
        ? array
        : payload === "Asc"
        ? array.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            else return 0;
          })
        : array.sort(function (a, b) {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            else return 0;
          });
    return dispatch({
      type: FILTER_ASC_DES,
      payload: [...filterOrder],
    });
  };
}

export function filterByAttack(payload, array) {
  return function (dispatch) {
    const filterAttack =
      payload === "MaxPower"
        ? array.sort(function (a, b) {
            if (a.attack < b.attack) return 1;
            if (a.attack > b.attack) return -1;
            else return 0;
          })
        : array.sort(function (a, b) {
            if (a.attack < b.attack) return -1;
            if (a.attack > b.attack) return 1;
            else return 0;
          });
    return dispatch({
      type: FILTER_BY_ATTACK,
      payload: [...filterAttack],
    });
  };
}
