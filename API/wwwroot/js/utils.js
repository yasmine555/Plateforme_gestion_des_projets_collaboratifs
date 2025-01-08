// utils.js
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Gestionnaire de formulaires générique
function handleFormSubmit(formId, submitCallback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                await submitCallback(data);
                form.reset();
                hideModal(form.closest('.modal').id);
            } catch (error) {
                console.error('Erreur lors de la soumission:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    }
}