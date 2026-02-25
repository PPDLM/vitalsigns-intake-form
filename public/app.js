// Esperamos a que el DOM esté cargado para evitar errores
document.addEventListener('DOMContentLoaded', () => {
    const intakeForm = document.getElementById('intake-form');

    // Interceptamos el evento 'submit'
    intakeForm.addEventListener('submit', async (event) => {
        // 1. Evitamos que la página se recargue
        event.preventDefault();

        // 2. Recolectamos los datos de manera inteligente
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // Manejo especial para el checkbox de consentimiento (convertirlo a booleano)
        data.consent = data.consent === 'on';

        try {
            // 3. Enviamos los datos al backend con Fetch
            const response = await fetch('/api/register-patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Convertimos el objeto JS a JSON
            });

            // 4. Procesamos la respuesta del servidor
            const result = await response.json();

            if (response.ok) {
                // 5. Mostramos éxito al usuario
                alert(`Success: ${result.message}`);
                intakeForm.reset(); // Limpia el formulario tras el éxito
            } else {
                alert(`Error: ${result.message}`);
            }

        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Could not connect to the server. Please check if server.js is running.");
        }
    });
});