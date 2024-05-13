let compras = [];

const listaProductos = document.getElementById("lista-productos");

const carrito = document.getElementById("img-carrito");

const vaciar = document.getElementById("vaciar-carrito");

const tbody = document.querySelector("#lista-carrito tbody")

listaProductos.addEventListener("click", e => {

    if (e.target.classList.contains("agregar-carrito")){
        
        const id = e.target.getAttribute("data-id");

        const card = e.target.parentElement.parentElement;

        agregarCarrito(id, card);
    }
});

document.addEventListener("DOMContentLoaded", () =>{
    const productosCache = localStorage.getItem("itemsCarrito");
    if(productosCache){
        listaProductos = JSON.parse(productosCache)
    }

    const modo = localStorage.getItem("mode");

    if(modo == "dark"){
        document.body.classList = "dark-mode"
    } else {
        document.body.classList = ""
    }
})


carrito.addEventListener("click", e => {
    console.log(e.target);
});


vaciar.addEventListener("click", e => {
    console.log(e.target);
});

function agregarCarrito(id, card) {

    const Infoproducto = {
        imagen : card.querySelector(".imagen-curso").src,
        titulo : card.querySelector("h4").textContent,
        precio : card.querySelector(".u-pull-right").textContent,
        id,
        cantidad : 1,

    }
    

    if (compras.some((productos) => id == productos.id)){
        const productoEncontrado = compras.find((producto) => 
            id == producto.id
        )
        productoEncontrado.cantidad++
    } else{
        compras.push(Infoproducto)
    }
    console.log(compras)
    pintar()
}

function pintar(){ 
    tbody.innerHTML = ""
    compras.forEach(producto => {
        const {imagen, titulo, precio, cantidad} = producto;
        tbody.innerHTML += `<tr>
        <td>
        <img src=${imagen} width ="50">
        </td>               
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <button>Eliminar</button>
        <td>
      </tr>`

    }) 

    localStorage.setItem("itemsCarrito", JSON.stringify())
}


const btnColorMode = document.querySelector("#toggle-dark-mode");

btnColorMode.addEventListener("click", (event) => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")){
    localStorage.setItem("mode", "dark")
    return
  }
    localStorage.setItem("mode", "ligth")

})



