const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Configuraciones (Middlewares)
app.use(cors()); // Permite peticiones desde otros orígenes
app.use(express.json()); // Permite que Express entienda el cuerpo (body) de las peticiones JSON

// 2. Servir archivos estáticos
// Esto hace que lo que esté en la carpeta /public sea accesible (index.html, style.css, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// 3. Crear el Endpoint (Ruta POST)
app.post('/api/register-patient', (req, res) => {
    // Extraemos la información que llega del frontend
    const patientData = req.body;

    // Validación básica en el servidor
    if (!patientData.name || !patientData.email) {
        return res.status(400).send({ 
            message: "Error: Name and Email are required fields." 
        });
    }

    // Por ahora, solo mostramos los datos en la terminal (backend console)
    console.log("=== New Patient Received ===");
    console.table(patientData); 

    // Enviamos una respuesta exitosa al cliente
    res.status(200).send({ 
        message: "Registration successful!",
        received: patientData 
    });
});

// 4. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open your browser to see the form!`);
});