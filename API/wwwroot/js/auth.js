// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(signinForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await API.signin(data);
                if (response.success) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                console.error('Erreur de connexion:', error);
                alert('Erreur de connexion. Veuillez réessayer.');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());

            if (data.password !== data.confirmPassword) {
                alert('Les mots de passe ne correspondent pas');
                return;
            }

            try {
                const response = await API.signup(data);
                if (response.success) {
                    alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                    window.location.href = 'signin.html';
                }
            } catch (error) {
                console.error('Erreur d\'inscription:', error);
                alert('Erreur d\'inscription. Veuillez réessayer.');
            }
        });
    }
});

// Middleware de vérification de l'authentification
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'signin.html';
        return false;
    }
    return true;
}