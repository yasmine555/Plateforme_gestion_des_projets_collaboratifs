// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    // Configuration des graphiques
    const projectProgressCtx = document.getElementById('projectProgressChart').getContext('2d');
    const taskDistributionCtx = document.getElementById('taskDistributionChart').getContext('2d');

    // Graphique de progression des projets
    new Chart(projectProgressCtx, {
        type: 'bar',
        data: {
            labels: ['Projet A', 'Projet B', 'Projet C', 'Projet D'],
            datasets: [{
                label: 'Progression (%)',
                data: [75, 45, 90, 60],
                backgroundColor: [
                    'rgba(26, 115, 232, 0.8)',
                    'rgba(26, 115, 232, 0.8)',
                    'rgba(26, 115, 232, 0.8)',
                    'rgba(26, 115, 232, 0.8)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Graphique de répartition des tâches
    new Chart(taskDistributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['À faire', 'En cours', 'Terminées'],
            datasets: [{
                data: [30, 45, 25],
                backgroundColor: [
                    'rgba(244, 180, 0, 0.8)',
                    'rgba(26, 115, 232, 0.8)',
                    'rgba(15, 157, 88, 0.8)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Mise à jour des statistiques
    const updateStats = async () => {
        try {
            const stats = await API.getProjectStats();
            document.querySelector('[data-stat="projects"]').textContent = stats.activeProjects;
            document.querySelector('[data-stat="tasks"]').textContent = stats.ongoingTasks;
            document.querySelector('[data-stat="members"]').textContent = stats.teamMembers;
            document.querySelector('[data-stat="completed"]').textContent = stats.completedTasks;
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
        }
    };

    // Timeline des projets avec visTimeline
    const timelineContainer = document.getElementById('projectTimeline');
    const timeline = new vis.Timeline(timelineContainer, new vis.DataSet([
        { id: 1, content: 'Projet A', start: '2024-01-01', end: '2024-03-31' },
        { id: 2, content: 'Projet B', start: '2024-02-15', end: '2024-05-30' },
        { id: 3, content: 'Projet C', start: '2024-04-01', end: '2024-07-31' }
    ]), {});

    // Initialisation
    updateStats();
    setInterval(updateStats, 300000); // Mise à jour toutes les 5 minutes
});