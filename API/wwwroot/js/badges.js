const BadgesManager = {
    init() {
        this.badgesList = document.getElementById('badgesList');
        this.badgeModal = document.getElementById('badgeModal');
        this.badgeForm = document.getElementById('badgeForm');

        document.getElementById('btnAwardBadge').addEventListener('click', () => this.showBadgeModal());
        this.badgeForm.addEventListener('submit', (e) => this.handleBadgeSubmit(e));

        document.getElementById('btnTasks').addEventListener('click', () => this.switchSection('tasks'));
        document.getElementById('btnBadges').addEventListener('click', () => this.switchSection('badges'));
        document.getElementById('btnUsers').addEventListener('click', () => this.switchSection('users'));

        this.loadBadges();
        this.loadUsers();
    },

    switchSection(section) {
        const tasksSection = document.getElementById('tasksSection');
        const badgesSection = document.getElementById('badgesSection');
        const usersSection = document.getElementById('usersSection');
        const btnTasks = document.getElementById('btnTasks');
        const btnBadges = document.getElementById('btnBadges');
        const btnUsers = document.getElementById('btnUsers');

        tasksSection.classList.add('hidden');
        badgesSection.classList.add('hidden');
        usersSection.classList.add('hidden');

        if (section === 'tasks') {
            tasksSection.classList.remove('hidden');
            btnTasks.classList.add('active');
        } else if (section === 'badges') {
            badgesSection.classList.remove('hidden');
            btnBadges.classList.add('active');
        } else if (section === 'users') {
            usersSection.classList.remove('hidden');
            btnUsers.classList.add('active');
        }
    },

    async loadBadges() {
        try {
            const data = await API.getBadges();
            this.renderBadges(data);
        } catch (error) {
            alert('Erreur lors du chargement des badges');
        }
    },

    renderBadges(badges) {
        this.badgesList.innerHTML = '';
        badges.forEach(badge => {
            const badgeElement = document.createElement('div');
            badgeElement.classList.add('badge');
            badgeElement.innerHTML = `
                <h3>${badge.name}</h3>
                <p>Points nécessaires: ${badge.points}</p>
            `;
            this.badgesList.appendChild(badgeElement);
        });
    },

    async loadUsers() {
        try {
            const users = await API.getUsers();
            this.renderUsers(users);
        } catch (error) {
            alert('Erreur lors du chargement des utilisateurs');
        }
    },

    renderUsers(users) {
        const usersBody = document.getElementById('usersBody');
        usersBody.innerHTML = '';
        users.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.innerHTML = `
                <td>${user.name}</td>
                <td>${user.points}</td>
                <td>${this.getUserBadge(user.points)}</td>
            `;
            usersBody.appendChild(userRow);
        });
    },

    getUserBadge(points) {
        if (points >= 100) return 'Gold';
        if (points >= 50) return 'Silver';
        return 'Bronze';
    },

    showBadgeModal() {
        this.badgeModal.classList.remove('hidden');
    },

    handleBadgeSubmit(event) {
        event.preventDefault();
        const badgeName = document.getElementById('badgeName').value;
        const badgePoints = document.getElementById('badgePoints').value;

        // Logique d'envoi au backend pour créer un badge
        API.createBadge({ name: badgeName, points: badgePoints })
            .then(() => {
                this.loadBadges();
                this.badgeModal.classList.add('hidden');
            })
            .catch(error => {
                alert('Erreur lors de la création du badge');
            });
    }
};

BadgesManager.init();
