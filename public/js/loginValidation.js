window.onload = function () {
  const formulario = document.querySelector("form");
  const password = document.querySelector("#password");
  const datoIngreso = document.querySelector("#dato_ingreso");
  const errores = document.querySelector(".error-msg");
  function stopSubmit(e) {
    let errors = [];

    if (datoIngreso.value == "") {
      errors.push("El nombre de usuario es obligatorio");
    }
    if (password.value == "") {
      errors.push("El campo de contraseña debe estar completo");
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
