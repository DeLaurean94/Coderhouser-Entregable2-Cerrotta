Consultor de Monedas a Peso Argentino

Este proyecto es una aplicación web diseñada para consultar las cotizaciones de diversas monedas internacionales (como el Dólar, Euro, Libra, entre otras) a Peso Argentino (ARS). A través de una interfaz sencilla, los usuarios pueden seleccionar una moneda, obtener la cotización actual y almacenar el historial de consultas en una base de datos remota usando MockAPI.io.

Características:

Consultas en tiempo real: Obtén la cotización de las monedas seleccionadas en tiempo real utilizando la API de ExchangeRate-API.
Historial de consultas: El historial de cotizaciones se guarda y se muestra al usuario en una lista, tanto en el almacenamiento local como en una base de datos remota (MockAPI.io).
Interfaz intuitiva: La aplicación cuenta con una interfaz sencilla para la selección de la moneda y la visualización de la cotización en un formato claro y comprensible.
Tecnologías y Librerías
El proyecto utiliza varias librerías y APIs para su funcionamiento. A continuación se describen las más relevantes:

Librerías utilizadas:

Luxon: Para la manipulación y formato de fechas.
Documentación de Luxon
Swal (SweetAlert2): Para mostrar alertas modales interactivas y notificaciones.
Documentación de SweetAlert2
APIs utilizadas
ExchangeRate-API: API para obtener las cotizaciones de monedas internacionales con respecto al Peso Argentino.
Documentación de ExchangeRate-API
MockAPI.io: Un servicio de backend como servicio (BaaS) para almacenar y recuperar datos. En este proyecto, se utiliza para guardar el historial de cotizaciones.

Flujo de Funcionamiento
El usuario selecciona una moneda de la lista (por ejemplo, Dólar, Euro, etc.).
La aplicación consulta en tiempo real la cotización de esa moneda con respecto al Peso Argentino utilizando la API de ExchangeRate-API.
Si la cotización es exitosa, se muestra al usuario en la interfaz y se guarda en un historial local en el navegador.
El historial de consultas se guarda también en una base de datos remota usando MockAPI.io, donde se puede acceder y consultar desde cualquier momento.
Endpoint de MockAPI.io
La URL del recurso en MockAPI.io para almacenar el historial de cotizaciones es:

https://675da3a963b05ed079786b75.mockapi.io/bdrucula/historialCotizaciones
Cada vez que el usuario consulta una cotización, el historial se actualiza en este endpoint. El formato de los datos es el siguiente:

{
  "moneda": "USD",
  "cotizacion": "0.00000967",
  "fecha": "2024-12-14 12:45:30"
}
