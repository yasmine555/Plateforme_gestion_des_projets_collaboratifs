import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ToastrService } from 'ngx-toastr';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  isLoading = false;

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        this.toastr.error('Erreur lors du chargement des projets');
        console.error('Erreur:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  deleteProject(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.toastr.success('Projet supprimé avec succès');
          this.loadProjects();
        },
        error: (error) => {
          this.toastr.error('Erreur lors de la suppression du projet');
          console.error('Erreur:', error);
        }
      });
    }
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'En cours': 'status-en-cours',
      'Terminé': 'status-termine',
      'En attente': 'status-en-attente'
    };
    return statusMap[status] || '';
  }
}