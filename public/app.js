document.addEventListener('DOMContentLoaded', () => {
    const intakeForm = document.getElementById('intake-form');

    intakeForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        data.consent = data.consent === 'on';

        try {
            const response = await fetch('/api/register-patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Success: ${result.message}`);
                intakeForm.reset();
            } else {
                alert(`Error: ${result.message}`);
            }

        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Could not connect to the server. Please check if server.js is running.");
        }
    });
});