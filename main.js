/* Entregable 1 + Cerrotta

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

// Entregable 2 + Cerrotta

//Entregable 3 - FINAL

const DateTime = luxon.DateTime;

const API_KEY = 'b9942a1e74b6eeba30087fd1';  
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

const mockApiUrl = 'https://675da3a963b05ed079786b75.mockapi.io/bdrucula/historialCotizaciones';

const monedaMap = {
    "dolar": "USD",
    "euro": "EUR",
    "libra": "GBP",
    "yen": "JPY",
};

function selectCurrency(currency) {
    document.getElementById('dropdownCurrencyButton').textContent = currency;
    window.selectedCurrency = currency;
}

async function consultarCotizacion() {
    if (!window.selectedCurrency) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Por favor, selecciona una moneda.',
        });
        return;
    }

    try {
        const monedaSeleccionada = monedaMap[window.selectedCurrency.toLowerCase()];
        if (!monedaSeleccionada) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Moneda no soportada.',
            });
            return;
        }

        const respuesta = await fetch(`${BASE_URL}/${API_KEY}/latest/ARS`);
        const data = await respuesta.json();

        if (data.result === 'success') {
            if (data.conversion_rates && data.conversion_rates[monedaSeleccionada] !== undefined) {
                const cotizacion = data.conversion_rates[monedaSeleccionada];
                const cotizacionFinal = (1 / cotizacion).toFixed(2);

                Swal.fire({
                    icon: 'success',
                    title: `Cotización de ${monedaSeleccionada}`,
                    text: `La cotización del ${monedaSeleccionada} es ${cotizacionFinal} pesos argentinos.`,
                });

                await guardarEnHistorial(mockApiUrl, monedaSeleccionada, cotizacionFinal);
                await mostrarHistorial();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: `La moneda seleccionada (${monedaSeleccionada}) no está disponible en las tasas de cambio.`,
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un problema al obtener las cotizaciones. Verifique la API Key o el servicio.',
            });
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un error al conectarse con la API.',
        });
    }
}

async function guardarEnHistorial(apiUrl, moneda, cotizacion) {
    const fechaLuxon = DateTime.now().toFormat('yyyy-LL-dd HH:mm:ss');
    const nuevaConsulta = { moneda, cotizacion, fecha: fechaLuxon };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaConsulta),
        });

        const data = await response.json();
    } catch (error) {
        console.error('Error al guardar en MockAPI.io:', error);
    }
}

async function mostrarHistorial() {
    try {
        const response = await fetch(mockApiUrl);
        const historial = await response.json();

        const historialDiv = document.getElementById('historial-entradas');
        historialDiv.innerHTML = '';

        historial.forEach((entrada) => {
            const historialItem = document.createElement('p');
            historialItem.textContent = `${entrada.fecha} - ${entrada.moneda}: ${entrada.cotizacion}`;
            historialDiv.appendChild(historialItem);
        });
    } catch (error) {
        console.error('Error al obtener el historial:', error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn-primary").addEventListener("click", consultarCotizacion);
    document.getElementById('limpiar-historial').addEventListener('click', () => limpiarHistorial(mockApiUrl));
    mostrarHistorial();
});

window.selectCurrency = selectCurrency;
window.consultarCotizacion = consultarCotizacion;
