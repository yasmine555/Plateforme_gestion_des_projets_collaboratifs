// projectManager.js

class ProjectManager {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
        this.members = JSON.parse(localStorage.getItem('members')) || [];
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Gestion des projets
    createProject(projectData) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const newProject = {
            id: Date.now(),
            ...projectData,
            projectManager: currentUser.name,
            projectManagerId: currentUser.id,
            teamMembers: [],
            tasks: [],
            createdAt: new Date().toISOString(),
            status: 'En cours'
        };

        this.projects.push(newProject);
        this._saveProjects();
        return newProject;
    }

    getProject(projectId) {
        return this.projects.find(p => p.id === projectId);
    }

    updateProject(projectId, updateData) {
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...updateData };
            this._saveProjects();
            return this.projects[index];
        }
        return null;
    }

    // Gestion des membres
    addMember(memberData) {
        const { projectId, ...memberInfo } = memberData;
        const project = this.getProject(projectId);

        if (!project) {
            throw new Error('Projet non trouvé');
        }

        const newMember = {
            id: Date.now(),
            ...memberInfo,
            projectIds: [projectId],
            tasks: [],
            createdAt: new Date().toISOString()
        };

        this.members.push(newMember);
        project.teamMembers.push(newMember.id);

        this._saveProjects();
        this._saveMembers();
        return newMember;
    }

    assignMemberToProject(memberId, projectId) {
        const member = this.getMember(memberId);
        const project = this.getProject(projectId);

        if (!member || !project) {
            throw new Error('Membre ou projet non trouvé');
        }

        if (!member.projectIds.includes(projectId)) {
            member.projectIds.push(projectId);
            project.teamMembers.push(memberId);

            this._saveProjects();
            this._saveMembers();
        }
    }

    getMember(memberId) {
        return this.members.find(m => m.id === memberId);
    }

    getProjectMembers(projectId) {
        const project = this.getProject(projectId);
        if (!project) return [];

        return project.teamMembers.map(memberId =>
            this.getMember(memberId)
        ).filter(Boolean);
    }

    // Gestion des tâches
    createTask(taskData) {
        const { projectId, assignedTo, ...taskInfo } = taskData;
        const project = this.getProject(projectId);
        const member = this.getMember(assignedTo);

        if (!project || !member) {
            throw new Error('Projet ou membre non trouvé');
        }

        const newTask = {
            id: Date.now(),
            ...taskInfo,
            projectId,
            assignedTo,
            status: 'À faire',
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        project.tasks.push(newTask.id);
        member.tasks.push(newTask.id);

        this._saveTasks();
        this._saveProjects();
        this._saveMembers();
        return newTask;
    }

    // Méthodes de sauvegarde privées
    _saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    _saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    _saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

// Export du gestionnaire
export const projectManager = new ProjectManager();