function validateForm(input) {
  const error = {};

  const Expresionletter = new RegExp("^[A-Z]+$", "i");
  const ExpresionNumber = new RegExp("^[0-9]+$", "i");
  //const ExpresionUrl = new RegExp(/^(ftp|http|https):[^ "]+$/);

  //NAME
  if (!input.name) {
    error.name = "Debe ingresar un nombre";
  } else if (input.name.length < 3 || input.name.length > 20) {
    error.name = "Entre 3 y 20 carácteres";
  } else if (!Expresionletter.test(input.name)) {
    error.name = "El valor debe ser letras";
  }

  //image
  //funciona pero la desactivo por si no poenen foto

  // if (!ExpresionUrl.test(input.image)) {
  //     error.image = 'Only valid Url'
  // }

  //hp

  if (!input.hp) {
    error.hp = "Puntos de vida requeridos";
  } else if (input.hp < 1 || input.hp > 99) {
    error.hp = "El valor de ser entre 1 y 99 ";
  } else if (!ExpresionNumber.test(input.hp)) {
    error.hp = "El valor debe ser un nùmero.";
  }

  //attack
  if (!input.attack) {
    error.attack = "Debe ingresar un valor";
  } else if (input.attack < 1 || input.attack > 150) {
    error.attack = "El valor de ser entre 1 y 150";
  } else if (!ExpresionNumber.test(input.attack)) {
    error.attack = "El valor debe ser un nùmero.";
  }

  //defense
  if (!input.defense) {
    error.defense = "Debe ingresar un valor";
  } else if (input.defense < 1 || input.defense > 150) {
    error.defense = "El valor de ser entre 1 y 150";
  } else if (!ExpresionNumber.test(input.defense)) {
    error.defense = "El valor debe ser un nùmero.";
  }

  //speed
  if (!input.speed) {
    error.speed = "Debe ingresar un valor";
  } else if (input.speed < 1 || input.speed > 70) {
    error.speed = "El valor de ser entre 1 y 70";
  } else if (!ExpresionNumber.test(input.speed)) {
    error.speed = "El valor debe ser un número.";
  }

  //height

  if (!input.height) {
    error.height = "Debe ingresar un valor";
  } else if (input.height < 1 || input.height > 180) {
    error.height = "El valor de ser entre 1 y 180";
  } else if (!ExpresionNumber.test(input.height)) {
    error.height = "El valor debe ser un número.";
  }

  //Weight

  if (!input.weight) {
    error.weight = "Debe ingresar un valor";
  } else if (input.weight < 1 || input.weight > 200) {
    error.weight = "El valor de ser entre 1 y 200";
  } else if (!ExpresionNumber.test(input.weight)) {
    error.weight = "El valor debe ser un número.";
  }

  //Types

  if (!input.types[0]) {
    error.types = "Debe seleccionar al menos un tipo";
  }

  return error;
}

export default validateForm;
