import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';


@Component({
  selector: 'app-project-list',
  template: `
    <div class="container">
      <h2>Projets</h2>
      <button (click)="navigateToCreate()">Nouveau Projet</button>
      
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let project of projects">
            <td>{{project.name}}</td>
            <td>{{project.startDate | date}}</td>
            <td>{{project.endDate | date}}</td>
            <td>{{project.status}}</td>
            <td>
              <button (click)="editProject(project.id)">Éditer</button>
              <button (click)="deleteProject(project.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  // ... autres méthodes
}
