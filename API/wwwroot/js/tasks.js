// tasks.js
const TasksManager = {
    init() {
        this.tasksList = document.getElementById('tasksList');
        this.taskModal = document.getElementById('taskModal');
        this.taskForm = document.getElementById('taskForm');

        document.getElementById('btnAddTask').addEventListener('click', () => this.showTaskModal());
        this.taskForm.addEventListener('submit', (e) => this.handleTaskSubmit(e));

        this.loadTasks();
    },

    async loadTasks() {
        try {
            const tasks = await API.getTasks();
            this.renderTasks(tasks);
        } catch (error) {
            alert('Erreur lors du chargement des tâches: ' + error.message);
        }
    },

    renderTasks(tasks) {
        this.tasksList.innerHTML = tasks.map(task => `
            <div class="task-card">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${task.progress}%"></div>
                </div>
                <div class="task-footer">
                    <span>Assigné à: ${task.assignedTo}</span>
                    <span>Date limite: ${new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div class="task-actions">
                    <button onclick="TasksManager.updateProgress(${task.id})" class="btn-secondary">
                        Mettre à jour le progrès
                    </button>
                </div>
            </div>
        `).join('');
    },

    showTaskModal() {
        this.taskModal.style.display = 'block';
    },

    closeTaskModal() {
        this.taskModal.style.display = 'none';
        this.taskForm.reset();
    },

    async handleTaskSubmit(e) {
        e.preventDefault();

        const taskData = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            dueDate: document.getElementById('taskDueDate').value,
            assignedToId: document.getElementById('taskAssignedTo').value
        };

        try {
            await API.createTask(taskData);
            this.closeTaskModal();
            await this.loadTasks();
        } catch (error) {
            alert('Erreur lors de la création de la tâche: ' + error.message);
        }
    },

    async updateProgress(taskId) {
        const progress = prompt('Nouveau pourcentage de progression (0-100):');
        if (progress === null) return;

        const progressNum = parseInt(progress);
        if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
            alert('Veuillez entrer un nombre entre 0 et 100');
            return;
        }

        try {
            await API.updateTaskProgress(taskId, progressNum);
            await this.loadTasks();
        } catch (error) {
            alert('Erreur lors de la mise à jour du progrès: ' + error.message);
        }
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    TasksManager.init();
});