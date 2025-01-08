const ProjectsManager = {
    init() {
        this.loadProjects();
        document.getElementById('projectForm').addEventListener('submit', this.handleSubmit.bind(this));
    },

    async loadProjects() {
        try {
            const projects = await API.getAllProjects();
            const html = projects.map(project => this.createProjectCard(project)).join('');
            document.getElementById('projectsList').innerHTML = html;
        } catch (error) {
            alert('Erreur lors du chargement des projets: ' + error.message);
        }
    },

    createProjectCard(project) {
        return `
            <div class="card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-dates">
                    <span>Début: ${project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Non défini'}</span>
                    <span>Fin: ${project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Non défini'}</span>
                </div>
                <div class="project-status">Statut: ${project.status}</div>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="ProjectsManager.editProject(${project.id})">
                        Modifier
                    </button>
                    <button class="btn btn-danger" onclick="ProjectsManager.deleteProject(${project.id})">
                        Supprimer
                    </button>
                </div>
            </div>
        `;
    },

    async handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const projectData = {
            name: formData.get('name'),
            description: formData.get('description'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            status: formData.get('status')
        };

        try {
            await API.createProjectAsync(projectData);
            hideModal('addProjectModal');
            this.loadProjects();
            event.target.reset();
        } catch (error) {
            alert('Erreur lors de la création du projet: ' + error.message);
        }
    },

    async editProject(id) {
        try {
            const project = await API.getProjectById(id);
            // Remplir le formulaire avec les données du projet
            document.getElementById('projectForm').elements['name'].value = project.name;
            document.getElementById('projectForm').elements['description'].value = project.description;
            document.getElementById('projectForm').elements['startDate'].value = project.startDate?.split('T')[0];
            document.getElementById('projectForm').elements['endDate'].value = project.endDate?.split('T')[0];
            document.getElementById('projectForm').elements['status'].value = project.status;

            showModal('addProjectModal');
        } catch (error) {
            alert('Erreur lors du chargement du projet: ' + error.message);
        }
    },

    async deleteProject(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

        try {
            await API.deleteProject(id);
            this.loadProjects();
        } catch (error) {
            alert('Erreur lors de la suppression du projet: ' + error.message);
        }
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    ProjectsManager.init();
});