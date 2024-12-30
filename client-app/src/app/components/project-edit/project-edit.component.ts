import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-edit',
  template: `
    <div class="container" *ngIf="projectForm">
      <h2>Modifier le projet</h2>
      
      <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
        <!-- Informations de base -->
        <div class="form-group">
          <label>Nom:</label>
          <input formControlName="name" class="form-control">
          <div *ngIf="projectForm.get('name')?.errors?.['required']" class="error-message">
            Le nom est requis
          </div>
        </div>

        <div class="form-group">
          <label>Description:</label>
          <textarea formControlName="description" class="form-control"></textarea>
        </div>

        <!-- Dates -->
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Date de début:</label>
            <input type="date" formControlName="startDate" class="form-control">
            <div *ngIf="projectForm.get('startDate')?.errors?.['required']" class="error-message">
              La date de début est requise
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Date de fin:</label>
            <input type="date" formControlName="endDate" class="form-control">
            <div *ngIf="projectForm.get('endDate')?.errors?.['required']" class="error-message">
              La date de fin est requise
            </div>
          </div>
        </div>

        <!-- Objectifs -->
        <div formArrayName="objectives">
          <h3>Objectifs</h3>
          <button type="button" (click)="addObjective()" class="btn btn-secondary">
            Ajouter un objectif
          </button>
          
          <div *ngFor="let objective of objectives.controls; let i=index">
            <div [formGroupName]="i" class="objective-form">
              <input formControlName="description" placeholder="Description">
              <input type="date" formControlName="dueDate">
              <select formControlName="status">
                <option value="NotStarted">Non commencé</option>
                <option value="InProgress">En cours</option>
                <option value="Completed">Terminé</option>
              </select>
              <button type="button" (click)="removeObjective(i)" class="btn btn-danger">
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <!-- Livrables -->
        <div formArrayName="deliverables">
          <h3>Livrables</h3>
          <button type="button" (click)="addDeliverable()" class="btn btn-secondary">
            Ajouter un livrable
          </button>
          
          <div *ngFor="let deliverable of deliverables.controls; let i=index">
            <div [formGroupName]="i" class="deliverable-form">
              <input formControlName="name" placeholder="Nom">
              <input formControlName="description" placeholder="Description">
              <input type="date" formControlName="dueDate">
              <select formControlName="status">
                <option value="NotStarted">Non commencé</option>
                <option value="InProgress">En cours</option>
                <option value="Completed">Terminé</option>
              </select>
              <button type="button" (click)="removeDeliverable(i)" class="btn btn-danger">
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <button type="submit" [disabled]="!projectForm.valid" class="btn btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  `
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.initForm();
    this.loadProject(id);
  }

  private initForm() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.dateValidator()]],
      status: [''],
      objectives: this.fb.array([]),
      deliverables: this.fb.array([])
    });
  }

  private dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.parent?.get('startDate')?.value;
      const endDate = control.value;

      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        return { dateInvalid: true };
      }
      return null;
    };
  }

  get objectives() {
    return this.projectForm.get('objectives') as FormArray;
  }

  get deliverables() {
    return this.projectForm.get('deliverables') as FormArray;
  }

  addObjective() {
    const objectiveForm = this.fb.group({
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['NotStarted']
    });

    this.objectives.push(objectiveForm);
  }

  removeObjective(index: number) {
    this.objectives.removeAt(index);
  }

  addDeliverable() {
    const deliverableForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['NotStarted']
    });

    this.deliverables.push(deliverableForm);
  }

  removeDeliverable(index: number) {
    this.deliverables.removeAt(index);
  }

  private loadProject(id: number) {
    this.projectService.getProject(id).pipe(
      catchError(error => {
        this.snackBar.open('Erreur lors du chargement du projet', 'Fermer', {
          duration: 3000
        });
        return EMPTY;
      })
    ).subscribe(project => {
      this.projectForm.patchValue({
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status
      });

      // Load objectives
      project.objectives.forEach(objective => {
        const objectiveForm = this.fb.group({
          id: [objective.id],
          description: [objective.description, Validators.required],
          dueDate: [objective.dueDate, Validators.required],
          status: [objective.status]
        });
        this.objectives.push(objectiveForm);
      });

      // Load deliverables
      project.deliverables.forEach(deliverable => {
        const deliverableForm = this.fb.group({
          id: [deliverable.id],
          name: [deliverable.name, Validators.required],
          description: [deliverable.description],
          dueDate: [deliverable.dueDate, Validators.required],
          status: [deliverable.status]
        });
        this.deliverables.push(deliverableForm);
      });
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const id = this.route.snapshot.params['id'];
      this.projectService.updateProject(id, this.projectForm.value).pipe(
        catchError(error => {
          this.snackBar.open('Erreur lors de la mise à jour du projet', 'Fermer', {
            duration: 3000
          });
          return EMPTY;
        })
      ).subscribe(() => {
        this.snackBar.open('Projet mis à jour avec succès', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/projects']);
      });
    }
  }
}
