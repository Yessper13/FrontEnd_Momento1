
let clienteActual = null;
let usuario = d.querySelector("#nombre-usuario-input");
let rol = d.querySelector("#rol-usuario");
let contrasena = d.querySelector("#contrasena-usuario");
let confContrasena = d.querySelector("#confirmar-contrasena");
let btnCreate = d.querySelector(".btn-create")


btnCreate.addEventListener('click',()=>{debugger
    let dataProduct = getDataUsuario();
    seadDataUsuario(dataProduct);
});

let getDataUsuario = () =>{
    let usuario;
    if (usuario.value && rol.value && contrasena.value && confContrasena.value) {
        usuario = {
            usuario: usuario.value,
            rol: rol.value,
            contrasena: contrasena.value
        }
        usuario.value = "";
        rol.value ="";
        contrasena.value = "";
    }else{
        alert("todos los campos son obligatorios");
    }
    return usuario;
};

let seadDataUsuario = async (data)=>{ debugger
    let url  = "http://localhost/backend-apiCrud/usuarios";
    try {
        let respuesta = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        if (respuesta.status === 406) {
            alert("Los datos enviados no son admitidos");
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            // location.href = "../listado-pro.html";
        }
    } catch (error) {
        console.log(error);
    }
}






// Función para mostrar el modal con información del cliente
function verCliente(id) {
    // Aquí harías la llamada a la API para obtener los datos del cliente
    // Por ahora usamos datos de ejemplo
    const clientesEjemplo = {
        1: {
            id_cliente: 1,
            nombre: "Alan",
            apellido: "Brito",
            email: "alambre@gmail.com",
            celular: "323399999",
            direccion: "Calle ciega 123",
            direccion2: "Edi. Castilla",
            descripcion: "dejar el pedido en la porteria"
        },
        2: {
            id_cliente: 2,
            nombre: "Zoyla",
            apellido: "Vaca",
            email: "vacalola@gmail.com",
            celular: "322131444",
            direccion: "Cra no se meta 12",
            direccion2: "casa 2",
            descripcion: "tocar el timbre 2 veces"
        }
    };

    const cliente = clientesEjemplo[id];
    if (cliente) {
        clienteActual = cliente;
        
        // Poblar el modal con los datos
        document.getElementById('modal-nombre-completo').textContent = `${cliente.nombre} ${cliente.apellido}`;
        document.getElementById('modal-email').textContent = cliente.email;
        document.getElementById('modal-celular').textContent = cliente.celular;
        document.getElementById('modal-direccion').textContent = cliente.direccion;
        document.getElementById('modal-direccion2').textContent = cliente.direccion2 || 'No especificada';
        document.getElementById('modal-descripcion').textContent = cliente.descripcion || 'Sin descripción';
        
        // Mostrar el modal
        $('#verClienteModal').modal('show');
    }
}

function editarCliente() {
    if (clienteActual) {
        // Redirigir a la página de edición con el ID del cliente
        window.location.href = `crear-cliente.html?id=${clienteActual.id_cliente}`;
    }
}

// Agregar event listeners a los botones de ver
document.addEventListener('DOMContentLoaded', function() {
    const botonesVer = document.querySelectorAll('.btn-view');
    botonesVer.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            verCliente(id);
        });
    });
});

//funcion para realizar la peticion al servidor
let sendUpdateProduct = async ( pro )=>{
    let url = "http://localhost/backend-apiCrud/clientes";
    try {
        let respuesta = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(pro)
        });
        if (respuesta.status === 406) {
            alert("Los datos enviados no son admitidos");
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = "../listado-pro.html";
        }
    } catch (error) {
        console.log(error);
    }
}