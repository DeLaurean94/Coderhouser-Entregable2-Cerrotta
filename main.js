/* PRE ENTREGA 1

//Función Login Rucula
function login() {

    const usuario = prompt("Ingresa tu nombre de usuario:");
    const contraseña = prompt("Ingresa tu contraseña:");

      alert("Bienvenido, " + usuario + "!");
    }

login();


//Cotización Ruculeta!
const cotizaciones = {
    "dolar": 1250,
    "euro": 1550,
    "peso": 1,
  };
  
  // Array para almacenar el historial de monedas consultadas
  const historialMonedas = [];
  
  // Función arrow para consultar la cotización
  const consultarCotizacion = () => {
    let continuar = true;
  
    // Bucle for que permite consultar hasta 10 veces
    for (let i = 0; continuar && i < 10; i++) { 
      const moneda = prompt("Ingresa la moneda que deseas consultar (dolar, euro, peso):").toLowerCase();
  
      if (cotizaciones[moneda] !== undefined) {
        alert(`La cotización de ${moneda} es: ${cotizaciones[moneda]}`);
        // Almacenar la moneda consultada en el historial
        historialMonedas.push(moneda);
        
        // Limitar el historial a las últimas 10 monedas
        if (historialMonedas.length > 10) {
          historialMonedas.shift(); // Eliminar la moneda más antigua
        }
      } else {
        alert("Moneda no reconocida. Intenta de nuevo.");
      }
  
      continuar = confirm("¿Deseas consultar otra moneda?");
    }
  }
  
  // Función arrow para ver el historial de monedas consultadas
  const verHistorial = () => {
    if (historialMonedas.length > 0) {
      alert(`Historial de Monedas Consultadas: ${historialMonedas.join(', ')}`);
    } else {
      alert("No has consultado ninguna moneda aún.");
    }
  }
  
  consultarCotizacion();

  verHistorial();
*/

  // Función para aplicar lectura del DOM e interacción en HTML

  const cotizaciones = {
    "dolar": 1250,
    "euro": 1550,
    "peso": 1,
  };

function selectCurrency(currency) {
    document.getElementById('dropdownCurrencyButton').textContent = currency;
    window.selectedCurrency = currency;
}

function consultarCotizacion() {
    if (!window.selectedCurrency) {
        alert("Por favor, selecciona una moneda.");
        return;
    }

    const cotizacion = cotizaciones[window.selectedCurrency];
    if (cotizacion !== undefined) {
        alert(`La cotización del ${window.selectedCurrency} es ${cotizacion}.`);
        guardarEnHistorial(window.selectedCurrency, cotizacion);
        mostrarHistorial();
    } else {
        alert("Moneda no encontrada.");
    }
}

function guardarEnHistorial(moneda, cotizacion) {
    let historial = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];

    const nuevaConsulta = {
        moneda: moneda,
        cotizacion: cotizacion,
        fecha: new Date().toLocaleString()
    };
    historial.push(nuevaConsulta);

    localStorage.setItem('historialCotizaciones', JSON.stringify(historial));
}

function mostrarHistorial() {
  const historialDiv = document.getElementById('historial-entradas');
  historialDiv.innerHTML = ''; 

  const historial = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];

  historial.forEach((entrada) => {
      const historialItem = document.createElement('p');
      historialItem.textContent = `${entrada.fecha} - ${entrada.moneda}: ${entrada.cotizacion}`;
      historialDiv.appendChild(historialItem);
  });
}

function limpiarHistorial() {
  localStorage.removeItem('historialCotizaciones');

  const historialDiv = document.getElementById('historial-entradas');
  historialDiv.innerHTML = '';

  alert('Historial limpiado.');
}

document.getElementById('limpiar-historial').addEventListener('click', limpiarHistorial);

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".btn-primary").addEventListener("click", consultarCotizacion);
    mostrarHistorial();
});
