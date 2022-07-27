const formulario = document.querySelector("form");
const inputs = document.querySelectorAll("form input");

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

var campos = {
  login_key: false,
  password: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "login_key":
      if (
        expresiones.usuario.test(e.target.value) ||
        expresiones.correo.test(e.target.value)
      ) {
        document.querySelector("#login_key").classList.remove("drawer-red");
        document.querySelector("#login_key").classList.add("drawer");
        document.querySelector(".error-msg").classList.add("oculto");
        campos.login_key = true;
      } else {
        document.querySelector("#login_key").classList.remove("drawer");
        document.querySelector("#login_key").classList.add("drawer-red");
        document.querySelector(".error-msg").classList.remove("oculto");
        campos.login_key = false;
      }
      break;
    case "password":
      if (e.target.value) {
        campos.password = true;
      } else {
        campos.password = false;
      }
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.login_key && campos.password) {
    document.querySelector("#error-msg").classList.add("oculto");
    formulario.submit();
  } else {
    document.querySelector("#error-msg").classList.remove("oculto");
  }
});
