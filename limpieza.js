// historial.js

async function limpiarHistorial(mockApiUrl) {
    try {
        const response = await fetch(mockApiUrl);
        const historial = await response.json();

        for (const entrada of historial) {
            await fetch(`${mockApiUrl}/${entrada.id}`, {
                method: 'DELETE',
            });
        }

        document.getElementById('historial-entradas').innerHTML = '';

        Swal.fire({
            icon: 'success',
            title: 'Historial Limpiado',
            text: 'El historial ha sido limpiado exitosamente.',
        });
    } catch (error) {
        console.error('Error al limpiar el historial:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al limpiar historial',
            text: 'Hubo un problema al intentar limpiar el historial.',
        });
    }
}

window.limpiarHistorial = limpiarHistorial;
