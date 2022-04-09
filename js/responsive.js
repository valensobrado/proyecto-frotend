let btnNavIcono = document.getElementById("nav-btn");
btnNavIcono.addEventListener("click", abrirMenu);

function abrirMenu() {
    document.querySelector(".nav-content-items").classList.toggle("nav-content-items_visible");
    document.getElementById("bar").classList.toggle("fa-bars");
    document.getElementById("bar").classList.toggle("fa-times");
}