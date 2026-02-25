const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/register-patient', (req, res) => {
    const patientData = req.body;

    if (!patientData.name || !patientData.email) {
        return res.status(400).send({ 
            message: "Error: Name and Email are required fields." 
        });
    }

    console.log("=== New Patient Received ===");
    console.table(patientData); 

    res.status(200).send({ 
        message: "Registration successful!",
        received: patientData 
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open your browser to see the form!`);
});