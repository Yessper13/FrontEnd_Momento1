let valorDomicilio = document.querySelector('.valor-domi');
let valorDescuento = document.querySelector('.valor-descuento');
let valorSubTotal = document.querySelector('.sub-total');
let valorTotal = document.querySelector('.valor-total');
let divListaPro = document.querySelector('.lista');
let tipoPago = document.querySelector('.tipo-pago');

document.addEventListener('DOMContentLoaded', () => {
    ponerDatos();
    tipoP(tipoPago.value,valorTotal.value);
});

function tipoP(valor,valorTotal) {
    alert(valorTotal)
    
    switch (valor) {
        case 1: valorTotal= valorTotal+(valorTotal*0.5); break;
        case 2: valorTotal= valorTotal+(valorTotal*0.3); break;
        case 3: valorTotal= valorTotal; break      ;
    
        default:
            break;
    }
    console.log(valorTotal);
}

 function ponerDatos() {
     let proResumen = JSON.parse(localStorage.getItem('pro-resumen') || '{}');
     if (proResumen != null) {

        
        console.log(proResumen);
        
        proResumen.productos.forEach((dato) => {
            let div = document.createElement('div')
            div.innerHTML = `
             <div class="d-flex justify-content-between align-items-center mb-24">
            <p class="lead color-black">${dato.nombre}</p>
            <p class="lead">$<span>${dato.precio}</span></p>
            </div>
            
            `;
            divListaPro.appendChild(div)
        });
        valorSubTotal.textContent = proResumen.subtotal;
        valorDescuento.textContent = proResumen.descuento;
        valorDomicilio.textContent = proResumen.domicilio;
        valorTotal.textContent = proResumen.totalPagar;
    }
} 


/*
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
*/ 
