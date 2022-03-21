var openPopUp = document.getElementById("abrirPopUp");
var popUp = document.getElementById("popUpLogOrSign");
var overlay = document.getElementById("overlayLogOrSign");
var closePopUp = document.getElementById("closePopUpLogOrSign");

openPopUp.addEventListener('click',()=>{
    overlay.classList.add('active');
    popUp.classList.add("active");
})
closePopUp.addEventListener('click',()=>{
    overlay.classList.remove('active')
    popUp.classList.remove("active");
})