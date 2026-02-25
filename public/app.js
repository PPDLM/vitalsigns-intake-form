document.addEventListener('DOMContentLoaded', () => {
    const intakeForm = document.getElementById('intake-form');

    if (!intakeForm) return;

    intakeForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        data.consent = formData.get('consent') === 'on';

        try {
            const response = await fetch(`${window.location.origin}/api/register-patient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();

                if (response.ok) {
                    alert(`Success: ${result.message}`);
                    intakeForm.reset();
                } else {
                    alert(`Server Error: ${result.message}`);
                }
            } else {
                alert("The server returned an unexpected error.");
            }

        } catch (error) {
            alert("Could not connect to the server.");
        }
    });
});