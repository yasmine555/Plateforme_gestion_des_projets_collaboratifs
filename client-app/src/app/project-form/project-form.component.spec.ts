import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectFormComponent } from './project-form.component';
import { ProjectService } from '../project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const projectSpy = jasmine.createSpyObj('ProjectService', ['getProjectById', 'addProject', 'updateProject']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ ProjectFormComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ProjectService, useValue: projectSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    }).compileComponents();

    projectServiceSpy = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.projectForm.get('name')?.value).toBe('');
    expect(component.projectForm.get('description')?.value).toBe('');
    expect(component.projectForm.get('status')?.value).toBe('En attente');
  });

  it('should validate required fields', () => {
    const form = component.projectForm;
    expect(form.valid).toBeFalsy();

    form.patchValue({
      name: 'Test Project',
      description: 'Test Description'
    });
    expect(form.valid).toBeTruthy();
  });

  it('should load project data when editing', () => {
    const testProject = {
      id: 1,
      name: 'Test Project',
      description: 'Test Description',
      status: 'En cours'
    };
    projectServiceSpy.getProjectById.and.returnValue(of(testProject));
    
    component.projectId = 1;
    component.ngOnInit();

    expect(projectServiceSpy.getProjectById).toHaveBeenCalledWith(1);
    expect(component.projectForm.value).toEqual({
      name: testProject.name,
      description: testProject.description,
      status: testProject.status
    });
  });

  it('should handle project load error', () => {
    projectServiceSpy.getProjectById.and.returnValue(throwError(() => new Error('Test error')));
    
    component.projectId = 1;
    component.ngOnInit();

    expect(toastrServiceSpy.error).toHaveBeenCalled();
  });

  it('should create new project successfully', () => {
    const newProject = {
      name: 'New Project',
      description: 'New Description',
      status: 'En attente'
    };
    projectServiceSpy.addProject.and.returnValue(of({}));
    
    component.projectForm.setValue(newProject);
    component.onSubmit();

    expect(projectServiceSpy.addProject).toHaveBeenCalledWith(newProject);
    expect(toastrServiceSpy.success).toHaveBeenCalled();
  });

  it('should update existing project successfully', () => {
    const updatedProject = {
      name: 'Updated Project',
      description: 'Updated Description',
      status: 'Terminé'
    };
    projectServiceSpy.updateProject.and.returnValue(of({}));
    
    component.projectId = 1;
    component.projectForm.setValue(updatedProject);
    component.onSubmit();

    expect(projectServiceSpy.updateProject).toHaveBeenCalledWith(1, updatedProject);
    expect(toastrServiceSpy.success).toHaveBeenCalled();
  });
});