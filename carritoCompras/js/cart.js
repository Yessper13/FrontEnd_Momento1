
let contadorCarrito = document.querySelector(".contar-pro");
let listadoCarrito = document.querySelector(".list-cart tbody");
let contentProducts = document.querySelector('.content-pro');
let iconoCarrito = document.querySelector(".carrito");
let botonCarrito = document.querySelector('.btn-cart');
let con = 0;

// Cuando cargue el DOM, traemos productos
document.addEventListener("DOMContentLoaded", () => {
    getProductData();
    mostrarCarritoMini(); 
});

botonCarrito.addEventListener("click", () => {
    location.href = "cart.html";
}); 


// Traer productos del backend
let getProductData = async () => {

    let url = "http://localhost/backend-apicrud/productos";
    try {
        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (respuesta.status === 204) {
            console.log("No hay datos en la BD");
        } else {
            let tableData = await respuesta.json();
            console.log(tableData);

            // Guardar productos en localStorage
            localStorage.setItem("productos", JSON.stringify(tableData));

            // Pintar productos en la vista
            contentProducts.innerHTML = "";
            tableData.forEach((dato, i) => {
                contentProducts.innerHTML += `
                    <div class="col-md-3 py-3 py-md-0">
                        <div class="card">
                            <img src="${dato.imagen}" alt="">
                            <div class="card-body">
                                <h3>Tasty ${dato.nombre}</h3>
                                <p>${dato.descripcion}</p>
                                <h5>${dato.precio}
                                    <span class="btn-product" onclick="infoProducto(${i})"><i class="fa-solid fa-basket-shopping"></i></span>
                                </h5>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.log(error);
    }
};


// Obtener información de un producto
function infoProducto(pos) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let producto = productos[pos];

    con++;
    contadorCarrito.textContent = con;

    let infoPro = {
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen
    };

    agregarProducto(infoPro);
    storageProduct(infoPro);
}
let storageProduct = (product)=>{
    let products= []
    let productPrevius = JSON.parse(localStorage.getItem("carrito"));
    if (productPrevius !=null) {
        products = Object.values(productPrevius);
    }
    products.push(product);
    localStorage.setItem("carrito", JSON.stringify(products)); //guardando en el localStorage

}


// Agregar producto al carrito
function agregarProducto(producto, index = null) {
    let numero = index !== null ? index + 1 : con; // si viene de localStorage usa el index, si no usa el contador

    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${numero}</td>
        <td><img src="${producto.imagen}" width="60"></td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td><button onclick="deleteCart(${numero})" type="button" class="btn-delete btn text-danger">X</button></td>
    `;
    listadoCarrito.appendChild(fila);
}


// Mostrar/Ocultar carrito
iconoCarrito.addEventListener("click", () => {
    if (listadoCarrito.parentElement.style.display === "none") {
        listadoCarrito.parentElement.style.display = "block";
    } else {
        listadoCarrito.parentElement.style.display = "none";
    }
});

// Evento para eliminar un producto del carrito
let deleteCart = (index) => {
    // Eliminar del DOM
    let productRow = listadoCarrito.querySelectorAll("tr")[index - 1];
    if (productRow) {
        productRow.remove();
    }

    // Eliminar del localStorage
    let products = JSON.parse(localStorage.getItem("carrito")) || [];
    products.splice(index - 1, 1); // elimina el producto en esa posición
    localStorage.setItem("carrito", JSON.stringify(products));

    // Reorganizar numeración en el DOM
    let rows = listadoCarrito.querySelectorAll("tr");
    rows.forEach((row, i) => {
        row.children[0].textContent = i + 1; 
        let btnDelete = row.querySelector(".btn-delete");
        if (btnDelete) {
            btnDelete.setAttribute("onclick", `deleteCart(${i + 1})`);
        }
    });

    // Actualizar contador visual
    contadorCarrito.textContent = rows.length;
    con = rows.length + 1;
};

// mantiene el contador del carrito con el localStorage
function mostrarCarritoMini() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    listadoCarrito.innerHTML = ""; 
    con = carrito.length; // reiniciamos el contador a la cantidad real

    carrito.forEach((producto, index) => {
        agregarProducto(producto, index);
    });

    contadorCarrito.textContent = carrito.length;
}