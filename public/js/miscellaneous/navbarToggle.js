var openNavBar = document.getElementById("openNavBar");
var closeNavBar = document.getElementById("closeNavBar");
var navBar = document.getElementById("botHeader");

openNavBar.addEventListener("click", () => {
  openNavBar.classList.remove("active");
  navBar.classList.add("active");
  closeNavBar.classList.add("active");
});
closeNavBar.addEventListener("click", () => {
  openNavBar.classList.add("active");
  navBar.classList.remove("active");
  closeNavBar.classList.remove("active");
});
