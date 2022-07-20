window.onload = function () {
  const image = document.querySelector("#image");
  const firstName = document.querySelector("#first_name");
  const lastName = document.querySelector("#last_name");
  const userName = document.querySelector("#user_name");
  const email = document.querySelector("#email");
  const adress = document.querySelector("#adress");
  const password = document.querySelector("#password");
  const checkPassword = document.querySelector("#checkPassword");
  const formulario = document.querySelector("form");
  const errores = document.querySelector(".error-msg");

  function stopSubmit(e) {
    let errors = [];

    if (firstName.value == "") {
      errors.push("debe ingresar un nombre");
    }
    if (lastName.value == "") {
      errors.push("Debe ingresar un apellido valido");
    }
    if (userName == "") {
      errors.push("Debe ingresar un nombre de usuario valido");
    }
    if (email == "") {
      errors.push("Debe ingresar un mail valido");
    }
    if (adress.value == "") {
      errors.push("debe ingresarce una direccion valida");
    }
    if (password.value == "") {
      errors.push("Debe ingresar una contraseña");
    }
    if (checkPassword == "") {
      errors.push("Debe ingresar la misma contraseña");
    }

    if (errors.length > 0) {
      e.preventDefault();
      errores.classList.add("error-msg");
      for (const erorr of errors) {
        errores.innerHTML += `<li> ${erorr} </li>`;
      }

      /* alert("no enviar"); */
      console.log("no se envio el formulario");
    }
  }

  formulario.addEventListener("submit", stopSubmit);
};
