let btnCrear = document.getElementById("btnCrear");
let firstName = document.getElementById("nombre-cliente");
let lastName = document.getElementById("apellido-cliente");
let email = document.getElementById("email-cliente");
let celular = document.getElementById("celular-cliente");
let direccion = document.getElementById("direccion-cliente");
let direccion2 = document.getElementById("direccion2-cliente");
let descripcion = document.getElementById("descripcion-cliente");

    const btnCreate = document.querySelector(".btn-crear");
    const btnUpdate = document.querySelector(".btn-actualizar");
    const titleCreate = document.querySelector(".title-create");
    const titleUpdate = document.querySelector(".title-update");

document.addEventListener("DOMContentLoaded", () => {


    // Cargar datos del cliente si se está editando 
        clienteUpdate = JSON.parse(localStorage.getItem("clienteEdit"));
        console.log(clienteUpdate);
    if (clienteUpdate != null) {
        // Modo actualización
        titleCreate.classList.add("d-none");
        btnCreate.classList.add("d-none");
        titleUpdate.classList.remove("d-none");
        btnUpdate.classList.remove("d-none");
        updateDataCliente();
    } else {
        // Modo creación
        titleCreate.classList.remove("d-none");
        btnCreate.classList.remove("d-none");
        titleUpdate.classList.add("d-none");
        btnUpdate.classList.add("d-none");
    }
});

btnCrear.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validar()) return;
    guardar();
    limpiar();
    alert("Registro exitoso");
});



function validar() {
    if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim()) {
        alert("Por favor complete los campos obligatorios.");
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(email.value)) {
        alert("Ingrese un correo electrónico válido.");
        return false;
    }
    return true;
}


function limpiar(){
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    celular.value = "";
    direccion.value = "";
    direccion2.value = "";
    descripcion.value = "";
}

let guardar = async () => {
    let usuario = {
        nombre: firstName.value,
        apellido: lastName.value,
        email: email.value,
        celular: celular.value,
        direccion: direccion.value,
        direccion2: direccion2.value,
        descripcion: descripcion.value
    };

    let url = "http://localhost/backend-apicrud/index.php?url=clientes";
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error('Error en la petición: ' + response.status);
        }

        let data = await response.json();
        console.log(data);

        limpiar();
        alert("Registro exitoso");

    } catch (error) {
        console.error('Hubo un problema con el fetch:', error);
        alert("No se pudo guardar el registro. Intente nuevamente.");
    }
};


//funcion para editar el cliente
let updateDataCliente = ()=>{
    //agregar datos a editar en los campos del formulario

    firstName.value = "";
    lastName.value = "";
    email.value = "";
    celular.value = "";
    direccion.value = "";
    direccion2.value = "";
    descripcion.value = "";

    id = clienteUpdate.id_cliente;
    firstName.value = clienteUpdate.nombre;
    lastName.value = clienteUpdate.apellido;
    email.value = clienteUpdate.email;
    celular.value = clienteUpdate.celular;
    direccion.value = clienteUpdate.direccion;
    direccion2.value = clienteUpdate.direccion2;
    descripcion.value = clienteUpdate.descripcion;
    let cliente;
    btnUpdate.addEventListener("click",()=>{ 
        cliente = {
            id: id,
            nombre: lastName.value,
            apellido: firstName.value,
            email: email.value,
            celular: celular.value,
            direccion: direccion.value,
            direccion2: direccion2.value,
            descripcion: descripcion.value
        }
        //borrar info de localStorage
        localStorage.removeItem("productEdit");
        //pasar los datos del cliente a la funcion
        sendUpdateProduct(cliente);

    }); 
    
};

//funcion para realizar la peticion al servidor
let sendUpdateProduct = async ( cliente )=>{
    let url = "http://localhost/backend-apicrud/index.php?url=clientes";
    try {
        let respuesta = await fetch(url,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(cliente)
        });
        if (respuesta.status === 406) {
            alert("Los datos enviados no son admitidos");
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = "../listado-clientes.html";
        }
    } catch (error) {
        console.log(error);
    }
}






