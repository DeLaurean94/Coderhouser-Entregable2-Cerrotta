//Login Rucula
function login() {

    const usuario = prompt("Ingresa tu nombre de usuario:");
    const contraseña = prompt("Ingresa tu contraseña:");

      alert("Bienvenido, " + usuario + "!");
    }

login();


//Cotización Ruculeta!
const cotizaciones = {
    "dolar": 350,
    "euro": 400,
    "peso": 0.01
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
