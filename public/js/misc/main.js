const burger = document.getElementById("burgerMenu");
const mobileNav = document.getElementsByClassName("mobileNav");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const closePopup = document.getElementById("closePopup");
const openPopup = document.getElementById("choiceLogOrSign");
const checkoutButton = document.getElementById("checkoutButton");

burger.addEventListener("click", (e) => {
  e.preventDefault();
  mobileNav[0].classList.toggle("active");
  checkoutButton.classList.toggle("toggle");
});

openPopup.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.classList.add("active");
  popup.classList.add("active");
  checkoutButton.classList.add("toggle");
});
closePopup.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.classList.remove("active");
  popup.classList.remove("active");
  checkoutButton.classList.remove("toggle");
});
