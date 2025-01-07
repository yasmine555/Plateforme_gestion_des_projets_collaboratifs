import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface Project {
  id?: number;
  name: string;
  description: string;
  status: 'En attente' | 'En cours' | 'Terminé';
}

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  projectId: number | null = null;
  isLoading = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      status: ['En attente', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    if (this.projectId) {
      this.loadProject();
    }
  }

  private loadProject(): void {
    this.isLoading = true;
    this.projectService.getProjectById(this.projectId!).subscribe({
      next: (data) => {
        this.projectForm.patchValue(data);
      },
      error: (error) => {
        this.toastr.error('Erreur lors du chargement du projet');
        console.error('Erreur:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid && !this.isLoading) {
      this.isLoading = true;
      const projectData = this.projectForm.value;

      const operation = this.projectId
        ? this.projectService.updateProject(this.projectId, projectData)
        : this.projectService.addProject(projectData);

      operation.subscribe({
        next: () => {
          this.toastr.success(
            this.projectId 
              ? 'Projet mis à jour avec succès'
              : 'Projet créé avec succès'
          );
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          this.toastr.error('Une erreur est survenue');
          console.error('Erreur:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/projects']);
  }
}