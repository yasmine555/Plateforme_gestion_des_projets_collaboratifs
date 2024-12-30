import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service'; // Assurez-vous que ce chemin est correct

@Component({
  selector: 'app-project-create',
  template: `
    <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Nom:</label>
        <input formControlName="name" type="text">
      </div>

      <div>
        <label>Description:</label>
        <textarea formControlName="description"></textarea>
      </div>

      <div>
        <label>Date de début:</label>
        <input formControlName="startDate" type="date">
      </div>

      <div>
        <label>Date de fin:</label>
        <input formControlName="endDate" type="date">
      </div>

      <div>
        <label>Statut:</label>
        <select formControlName="status">
          <option value="NotStarted">Non commencé</option>
          <option value="InProgress">En cours</option>
          <option value="Completed">Terminé</option>
        </select>
      </div>

      <button type="submit">Créer</button>
    </form>
  `
})


export class ProjectCreateComponent {

  projectForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    status: ['NotStarted', Validators.required],
    objectives: this.fb.array([]),
    deliverables: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value)
        .subscribe(() => this.router.navigate(['/projects']));
    }
  }
}
