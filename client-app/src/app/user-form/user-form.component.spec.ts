import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { UserService } from '../user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['getUserById', 'addUser', 'updateUser']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.userForm.get('name')?.value).toBe('');
    expect(component.userForm.get('role')?.value).toBe('MembreEquipe');
  });

  it('should validate required fields', () => {
    const form = component.userForm;
    expect(form.valid).toBeFalsy();

    form.controls['name'].setValue('John Doe');
    expect(form.valid).toBeTruthy();
  });

  it('should validate name minimum length', () => {
    const nameControl = component.userForm.controls['name'];
    nameControl.setValue('A');
    expect(nameControl.errors?.['minlength']).toBeTruthy();

    nameControl.setValue('John');
    expect(nameControl.errors).toBeNull();
  });

  it('should load user data when editing', () => {
    const testUser = { id: 1, name: 'John Doe', role: 'ChefDeProjet' };
    userServiceSpy.getUserById.and.returnValue(of(testUser));
    
    component.userId = 1;
    component.ngOnInit();

    expect(userServiceSpy.getUserById).toHaveBeenCalledWith(1);
    expect(component.userForm.value).toEqual({
      name: testUser.name,
      role: testUser.role
    });
  });

  it('should handle user load error', () => {
    userServiceSpy.getUserById.and.returnValue(throwError(() => new Error('Test error')));
    
    component.userId = 1;
    component.ngOnInit();

    expect(toastrServiceSpy.error).toHaveBeenCalled();
  });

  it('should create new user successfully', () => {
    const newUser = { name: 'John Doe', role: 'MembreEquipe' };
    userServiceSpy.addUser.and.returnValue(of({}));
    
    component.userForm.setValue(newUser);
    component.onSubmit();

    expect(userServiceSpy.addUser).toHaveBeenCalledWith(newUser);
    expect(toastrServiceSpy.success).toHaveBeenCalled();
  });

  it('should update existing user successfully', () => {
    const updatedUser = { name: 'John Doe', role: 'ChefDeProjet' };
    userServiceSpy.updateUser.and.returnValue(of({}));
    
    component.userId = 1;
    component.userForm.setValue(updatedUser);
    component.onSubmit();

    expect(userServiceSpy.updateUser).toHaveBeenCalledWith(1, updatedUser);
    expect(toastrServiceSpy.success).toHaveBeenCalled();
  });
});
