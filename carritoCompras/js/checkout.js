let valorDomicilio = document.querySelector('.valor-domi');
let valorDescuento = document.querySelector('.valor-descuento');
let valorSubTotal = document.querySelector('.sub-total');
let valorTotal = document.querySelector('.valor-total');
let divListaPro = document.querySelector('.lista');
let tipoPago = document.querySelectorAll('input[name="radio"]');
let totalBase = 0; 
let radioPago =0; 
let  p = 0;

 
document.addEventListener('DOMContentLoaded', () => {
    
    ponerDatos();

});

function ponerDatos() {
  let proResumen = JSON.parse(localStorage.getItem('pro-resumen') || '{}');
  if (proResumen != null) {
    proResumen.productos.forEach((dato) => {
      let div = document.createElement('div')
      div.innerHTML = `
       <div class="d-flex justify-content-between align-items-center mb-24">
          <p class="lead color-black">${dato.nombre}</p>
          <p class="lead">$<span>${dato.precio*(dato.cantidad || 1)}</span></p>
       </div>
      `;
      divListaPro.appendChild(div)
    });

    valorSubTotal.textContent = proResumen.subtotal;
    valorDescuento.textContent = proResumen.descuento;
    valorDomicilio.textContent = proResumen.domicilio;
    valorTotal.textContent = proResumen.totalPagar;

    // 🔥 limpiar y convertir a número
    totalBase = parseFloat(String(proResumen.totalPagar).replace(/[^0-9.-]+/g, ""));
  }
}

tipoPago.forEach(radio => {
  radio.addEventListener("change", (e) => {
    radioPago = e.target.value;
    p = tipoP(radioPago, totalBase); 
    valorTotal.textContent = p.toFixed(3); // mostrará número con 2 decimales
  });
});



function tipoP(valor, valorTotal) {
      
    //alert("El valor del tipo de pago es: " + valor + " y el total a pagar es: " + valorTotal);
    console.log("tipoPago:", valor, "tipo:", typeof valor);
    console.log("totalPagar recibido:", valorTotal, "tipo:", typeof valorTotal);

    switch (valor) {
        case '1': 
            return valorTotal = valorTotal + ( valorTotal * 0.05 ) ;    
                    
        case '2':   
                   return valorTotal = valorTotal + ( valorTotal * 0.1 ) ;    
            
        case '3': 
            return  valorTotal; 
            
    }

}


