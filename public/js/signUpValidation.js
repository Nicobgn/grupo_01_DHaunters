const formulario = document.querySelector("form");
const inputs = document.querySelectorAll("form input");

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{8,16}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  direccion: /^[a-zA-Z0-9\_\-\s\#]{4,40}$/,
};

let campos = {
  first_name: false,
  last_name: false,
  user_name: false,
  email: false,
  adress: false,
  password: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "first_name":
      validarCampo(expresiones.nombre, e.target, "first_name");
      break;
    case "last_name":
      validarCampo(expresiones.nombre, e.target, "last_name");
      break;
    case "user_name":
      validarCampo(expresiones.nombre, e.target, "user_name");
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, "email");
      break;
    case "adress":
      validarCampo(expresiones.direccion, e.target, "adress");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      validarPassword2();
      break;
    case "checkPassword":
      validarPassword2();
      break;
  }
};

const validarCampo = (valTyp, valueInput, campo) => {
  if (valTyp.test(valueInput.value)) {
    document.querySelector(`#${campo}`).classList.remove("drawer-red");
    document.querySelector(`#${campo}`).classList.add("drawer");
    document.querySelector(`form div .${campo}`).classList.add("oculto");
    campos[campo] = true;
  } else {
    document.querySelector(`#${campo}`).classList.remove("drawer");
    document.querySelector(`#${campo}`).classList.add("drawer-red");
    document.querySelector(`form div .${campo}`).classList.remove("oculto");
    campos[campo] = false;
  }
};

const validarPassword2 = () => {
  const inputPassword = document.getElementById("password");
  const inputCheckPassword = document.getElementById("checkPassword");

  if (inputPassword.value !== inputCheckPassword.value) {
    document.getElementById(`checkPassword`).classList.add("drawer-red");
    document.getElementById(`checkPassword`).classList.remove("drawer");
    document
      .querySelector(`form div .checkPassword`)
      .classList.remove("oculto");
    campos.password = false;
  } else {
    document.getElementById(`checkPassword`).classList.remove("drawer-red");
    document.getElementById(`checkPassword`).classList.add("drawer");
    document.querySelector(`form div .checkPassword`).classList.add("oculto");
    campos.password = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let terminos = document.querySelector("#tyc");
  if (
    campos.user_name &&
    campos.last_name &&
    campos.first_name &&
    campos.email &&
    campos.password &&
    campos.adress &&
    terminos.checked
  ) {
    document.querySelector("#error-msg").classList.add("oculto");
    formulario.submit();
  } else {
    document.querySelector("#error-msg").classList.remove("oculto");
  }
});
