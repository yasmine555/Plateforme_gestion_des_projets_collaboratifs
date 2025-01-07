import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from '../project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const projectSpy = jasmine.createSpyObj('ProjectService', ['getProjects', 'deleteProject']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ ProjectListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ProjectService, useValue: projectSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    }).compileComponents();

    projectServiceSpy = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    projectServiceSpy.getProjects.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on init', () => {
    const testProjects = [
      { id: 1, name: 'Project 1', description: 'Test 1', status: 'En cours' },
      { id: 2, name: 'Project 2', description: 'Test 2', status: 'Terminé' }
    ];
    projectServiceSpy.getProjects.and.returnValue(of(testProjects));

    component.ngOnInit();

    expect(projectServiceSpy.getProjects).toHaveBeenCalled();
    expect(component.projects).toEqual(testProjects);
  });

  it('should handle projects load error', () => {
    projectServiceSpy.getProjects.and.returnValue(throwError(() => new Error('Test error')));

    component.ngOnInit();

    expect(toastrServiceSpy.error).toHaveBeenCalled();
  });

  it('should delete project successfully', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    projectServiceSpy.deleteProject.and.returnValue(of({}));

    component.deleteProject(1);

    expect(projectServiceSpy.deleteProject).toHaveBeenCalledWith(1);
    expect(toastrServiceSpy.success).toHaveBeenCalled();
    expect(projectServiceSpy.getProjects).toHaveBeenCalled();
  });

  it('should not delete project when user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteProject(1);

    expect(projectServiceSpy.deleteProject).not.toHaveBeenCalled();
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('En cours')).toBe('status-en-cours');
    expect(component.getStatusClass('Terminé')).toBe('status-termine');
    expect(component.getStatusClass('En attente')).toBe('status-en-attente');
    expect(component.getStatusClass('Invalid')).toBe('');
  });
});