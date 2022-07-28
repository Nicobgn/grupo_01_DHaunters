let productList = document.querySelectorAll(".product-list");

console.log(productList);

productList.forEach((list) => {
  list.onclick = async (e) => {
    let { target } = e;
    let id = target.getAttribute("id");

    console.log(parent);

    try {
      if (id.includes("cart__button_")) {
        // If its a cart button

        let parent = target.parentElement;
        let children = parent.children;
        let idParts = id.split("-");
        let idProduct = idParts[1];

        e.preventDefault();
        if (id.includes("add")) {
          // If its the add button

          children[1].classList.remove("hidden");
          target.classList.add("hidden");

          console.log(idProduct);

          fetch(`http://localhost:3000/user/cart/add/${idProduct}`);

          // console.log("Boton añadir");

          // console.log(children[1]);
        } else if (id.includes("remove")) {
          // If its the remove button
          children[0].classList.remove("hidden");
          target.classList.add("hidden");

          console.log("Boton Borrar");
        }
      } else {
        console.log("Estas clickeando algo que no es el boton");
      }
    } catch (error) {
      console.log("no estas clickeando nada");
    }
  };
});
