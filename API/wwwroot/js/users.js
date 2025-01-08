// URL de base pour vos API
const API_BASE_URL = "https://localhost:2093/api/User";

// Charger les utilisateurs et les afficher
async function loadUsers() {
    const usersTableBody = document.getElementById("usersTableBody");
    usersTableBody.innerHTML = ""; // Réinitialise le tableau

    try {
        const response = await fetch(`${API_BASE_URL}/GetUsers`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs.");

        const users = await response.json();

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.role === 0 ? "Chef de Projet" : "Membre Équipe"}</td>
                <td>${user.points || 0}</td>
                <td>${user.badges.length}</td>
                <td>
                    <button class="btn btn-edit" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-delete" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Ajouter un nouvel utilisateur
async function addUser() {
    const userName = document.getElementById("userName").value;
    const userRole = document.getElementById("userRole").value;

    try {
        const response = await fetch(`${API_BASE_URL}/AddUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: userName, role: parseInt(userRole) })
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout de l'utilisateur.");
        document.getElementById("userForm").reset();
        loadUsers(); // Recharge les utilisateurs
        closeModal('addUserModal');
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Supprimer un utilisateur
async function deleteUser(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/DeleteUser/${userId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erreur lors de la suppression de l'utilisateur.");
        loadUsers(); // Recharge les utilisateurs
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Éditer un utilisateur (fonctionnalité à ajouter)
function editUser(userId) {
    alert("Fonction d'édition à implémenter pour l'utilisateur ID : " + userId);
}

// Ouvrir une modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Fermer une modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Initialisation
document.addEventListener("DOMContentLoaded", loadUsers);
