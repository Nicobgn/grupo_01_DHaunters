let productList = document.querySelectorAll(".product-list");
let add = document.querySelectorAll(".cart__button_add");
let remove = document.querySelectorAll(".cart__button_remove");

console.log(productList);

productList.forEach((list) => {
  list.onclick = (e) => {
    try {
      e.preventDefault();
      console.log(e.target);
    } catch (error) {
      console.log("no estas clickeando nada");
    }
  };
});
