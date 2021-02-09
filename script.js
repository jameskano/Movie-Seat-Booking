// jshint esversion:9

const container = document.querySelector(".container");
const asientos = document.querySelectorAll(".filas .asientos:not(.ocupado)");
const sitiosSeleccionados = document.querySelector("#sitios-seleccionados");
const precioTotal = document.querySelector("#precio-total");
let sitiosSeleccionadosArr = [];

const sitiosElegidos = JSON.parse(localStorage.getItem("sitiosSeleccionados"));
if(sitiosElegidos !== null && sitiosElegidos.length > 0) {
  asientos.forEach((sitio, index) => {
    if(sitiosElegidos.indexOf(index) > -1) {
      sitio.classList.add("seleccionado");
    }
  });
}

// Mostrar sitios guardados
if(sitiosElegidos) {
 sitiosSeleccionados.innerHTML = sitiosElegidos.length - 1;
 precioTotal.innerHTML = (sitiosElegidos.length - 1) * 6; 
}

// Añadir y quitar sitios
container.addEventListener("click", function(e) {
  if(e.target.classList.contains("seleccionado")) {
    sitiosSeleccionados.innerHTML -= 1;
    precioTotal.innerHTML -= 6;
  }
  else if(!e.target.classList.contains("ocupado") && e.target.classList.contains("asientos")){
    sitiosSeleccionados.innerHTML = parseInt(sitiosSeleccionados.innerHTML) + 1;
    precioTotal.innerHTML = parseInt(precioTotal.innerHTML) + 6;
  }

  if(e.target.classList.contains("asientos") && e.target.parentElement.classList.contains("filas") && !e.target.classList.contains("ocupado")) {
    e.target.classList.toggle("seleccionado");

    // Guardar sitios
    const seleccionarSitios = document.querySelectorAll(".seleccionado");
    const sitiosIndex = [...seleccionarSitios].map(function(sitios) {
      return [...asientos].indexOf(sitios);
    });

    localStorage.setItem("sitiosSeleccionados", JSON.stringify(sitiosIndex));
  }
});
