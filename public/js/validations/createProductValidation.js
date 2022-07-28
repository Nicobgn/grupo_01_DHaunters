const formulario = document.querySelector("form");
const inputs = document.querySelectorAll("form input");

const expresiones = {
  description: /^.{1,50}$/,
  descriptionLong: /^.{50,1000}$/,
  category: /^[a-zA-ZÀ-ÿ\_\-\s]{1,20}$/,
  name: /^[a-zA-ZÀ-ÿ0-9\s]{3,40}$/, // Letras y espacios, pueden llevar acentos y numeros
  password: /^.{8,16}$/, // 4 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{7,14}$/, // 7 a 14 numeros.
  price: /^[0-9\s\$\,\.]{1,40}$/,
};

let campos = {
  name: false,
  price: false,
  shortDesc: false,
  longDesc: false,
  img: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "name":
      validarCampo(expresiones.name, e.target, "name");
      break;
    case "price":
      validarCampo(expresiones.price, e.target, "price");
      break;
    case "shortDesc":
      validarCampo(expresiones.description, e.target, "shortDesc");
      break;
    case "longDesc":
      validarCampo(expresiones.descriptionLong, e.target, "longDesc");
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

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

document.querySelector("#img").addEventListener("change", () => {
  let valorImg = document.querySelector("#img").files[0].name;
  let extImg = valorImg.split(".").pop().toLowerCase();
  let extensiones = [".jpg", ".jpeg", ".npg", "png", "gif"];
  if (extensiones.includes(extImg)) {
    document.querySelector("label").classList.remove("drawer-red");
    document.querySelector("label").classList.add("drawer");
    document.querySelector(`form div .img`).classList.add("oculto");
    campos.img = true;
  } else {
    document.querySelector("label").classList.remove("drawer");
    document.querySelector("label").classList.add("drawer-red");
    document.querySelector(`form div .img`).classList.remove("oculto");
    campos.img = false;
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let terminos = document.querySelector("#tyc");
  if (
    campos.name &&
    campos.price &&
    campos.shortDesc &&
    campos.longDesc &&
    campos.img
  ) {
    document.querySelector("#error-msg").classList.add("oculto");
    formulario.submit();
  } else {
    document.querySelector("#error-msg").classList.remove("oculto");
  }
});
