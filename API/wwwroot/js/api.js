// api.js
const API = {
    baseUrl: '/api',

    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers
            }
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        return response.json();
    },

    // Tâches
    async getTasks() {
        return this.request('/projectmanagement/team-progress');
    },

    async createTask(taskData) {
        return this.request('/projectmanagement/assign-task', {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    },

    async updateTaskProgress(taskId, progress) {
        return this.request(`/projectmanagement/update-progress`, {
            method: 'PUT',
            body: JSON.stringify({ taskId, progress })
        });
    },

    // Badges
    async getBadges() {
        return this.request('/projectmanagement/team-progress');
    },

    async awardBadge(userId, badgeName) {
        return this.request('/projectmanagement/award-badge', {
            method: 'POST',
            body: JSON.stringify({ userId, badgeName })
        });
    }
};