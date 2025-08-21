let listaCarrito = document.querySelector('.tableProduct tbody');
let resumenSubTotal = document.querySelector('.sub-total');
let resumenDescuento = document.querySelector('.promo');
let resumenTotal = document.querySelector('.total');
let destino = document.querySelector('.destino');
let resumenDomicilio = document.querySelector('.valor-dom');


document.addEventListener('DOMContentLoaded', () => {
    cargarProducto();
});

// Función para manejar la cantidad de productos y el total por producto
let infoPedido = (pos) => {
    let cantidadProductos = document.querySelectorAll(".quantity input.number");
    let btnDisminuir = document.querySelectorAll(".decrement i");
    let btnAumentar = document.querySelectorAll(".increment i");
    let totalProductos = document.querySelectorAll(".total-pro"); 

    // Eventos a los botones + y -
    let valorUnitario = Number(totalProductos[pos].textContent);

    btnAumentar[pos].addEventListener("click", () => {
        let valorActual = Number(cantidadProductos[pos].value);
        cantidadProductos[pos].value = valorActual + 1;
        totalProductos[pos].textContent = valorUnitario + Number(totalProductos[pos].textContent);
    });     

    btnDisminuir[pos].addEventListener("click", () => {
        let valorActual = Number(cantidadProductos[pos].value);
        if (valorActual > 1) {
            cantidadProductos[pos].value = valorActual - 1;
            totalProductos[pos].textContent = Number(totalProductos[pos].textContent) - valorUnitario;
        }
    });
}

let cargarProducto = () => {
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem('carrito'));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }
     //comprobar si hay productos en el carrito
    if (todosProductos.length != 0) {
        listaCarrito.innerHTML = "";
        todosProductos.forEach((producto, i) => {
            let fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="product-block">
                    <a href="#" class="btn-eliminar"><i class="fa-solid fa-x"></i></a>
                    <img src="${producto.imagen}" alt="">
                    <a href="product-detail.html" class="h6">${producto.nombre}</a>
                </td>
                <td>
                    <p class="lead color-black">$${producto.precio}</p>
                </td>
                <td>
                    <div class="quantity quantity-wrap">
                        <div class="decrement" onclick="actualizarCantidad(${i},-1)"><i class="fa-solid fa-minus"></i></div>
                        <input class="number" type="text" name="quantity" value="${producto.cantidad || 1}" maxlength="2" size="1" readonly>
                        <div class="increment" onclick="actualizarCantidad(${i},1)"><i class="fa-solid fa-plus"></i></div>
                    </div>
                </td>
                <td>
                    <h6 class="total-pro">${producto.precio}</h6>
                </td>
            `;
            listaCarrito.appendChild(fila);
            infoPedido(i);
        });
    }else {
    let fila = document.createElement('tr');
    fila.innerHTML = `
        <td colspan="4">
            <p class="text-center fs-3">No hay productos en el carrito</p>
        </td>
    `;
    listaCarrito.appendChild(fila);
}

    // Asignar eventos a los botones eliminar
    let botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach((boton, index) => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            eliminarProducto(index);
        });
    });

    resumenCompra();
}

 //funciones para actualizar la cantidad de productos
function actualizarCantidad(pos,canbio){
    let todosProductos = [];
    let productosPrevios = JSON.parse(localStorage.getItem('carrito'));
    if (productosPrevios != null) {
        todosProductos = Object.values(productosPrevios);
    }
    if(todosProductos[pos]){
        //actualizar cantidad
        todosProductos[pos].cantidad = (todosProductos[pos].cantidad || 1) + canbio;
        // evitar que la cantidad sea menor a 1
        
        if(todosProductos[pos].cantidad < 1) {
            todosProductos[pos].cantidad = 1; 
        }
    }
    // actualizar en localStorage
    localStorage.setItem('carrito', JSON.stringify(todosProductos));
    // recargar la tabla
    cargarProducto();
}




function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // elimina el producto en esa posición
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Recargar la tabla
    listaCarrito.innerHTML = "";
    cargarProducto();
}



//funcion para el resumen de la compra
function resumenCompra() {
    let todosProductos = JSON.parse(localStorage.getItem('carrito')) || [];
    let subtotal = 0; // acumula el subtotal de todos los productos
    
    // recorrer cada producto y acumular en el subtotal
    todosProductos.forEach(producto => {
        subtotal += producto.precio * (producto.cantidad || 1);
    });

    // calcular descuento del 10% si la compra es mayor a 100.000
    let descuento = subtotal > 100000 ? subtotal * 0.1 : 0;

    // calcular el domicilio según el destino seleccionado
    let domicilio = 0;
    switch (destino.value) {
        case "Medellin":default: domicilio; break;
        case "Bello": domicilio = 10000; break;
        case "Copacabana": domicilio = 20000; break;
        case "Envigado": domicilio = 15000; break;
        case "Itagüi": domicilio = 15000; break;
        case "Sabaneta": domicilio = 15000; break;
        case "La estrella": domicilio = 20000; break;
        case "Caldas": domicilio = 20000; break;
    }

    // calcular el total a pagar
    let totalPagar = subtotal - descuento + domicilio;

    // Mostrar valores en el resumen
    resumenSubTotal.textContent = `$${subtotal.toLocaleString()}`;
    resumenDescuento.textContent = `-$${descuento.toLocaleString()}`;
    resumenTotal.textContent = `$${totalPagar.toLocaleString()}`;
    resumenDomicilio.textContent = `$${domicilio.toLocaleString()}`;
}

// Evento para actualizar el resumen cuando cambie el destino
destino.addEventListener('change', () => {
    resumenCompra();
});

