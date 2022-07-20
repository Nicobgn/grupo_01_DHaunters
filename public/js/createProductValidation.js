window.onload = function () {
  const formulario = document.querySelector("form");
  const nombreProducto = document.querySelector("#name");
  const precio = document.querySelector("#price");
  const imagen = document.querySelector("#img");
  const shortDesc = document.querySelector("#shortDesc");
  const longDesc = document.querySelector("#longDesc");
  const categoria = document.querySelector("#category");
  const universo = document.querySelector("#universe");
  const errores = document.querySelector(".error-msg");

  function stopSubmit(e) {
    let errors = [];

    if (nombreProducto.value == "") {
      errors.push("Debe ingresar el nombre del producto");
    }
    if (precio.value == "") {
      errors.push("Debe ingresar el precio del producto");
    }
    if (imagen.value == "") {
      errors.push("Debe ingresar una imagen que reprecente el producto");
    }
    if (shortDesc.value == "") {
      errors.push("Debe realizar una greve descripcion del producto");
    }
    if (longDesc.value == "") {
      errors.push("Debe realizar una descripcion detallada del producto");
    }
    if (categoria.value == "") {
      errors.push("Debe elegir la categoria del producto");
    }
    if (universo.value == "") {
      errors.push("Debe elegir el universo del producto");
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
