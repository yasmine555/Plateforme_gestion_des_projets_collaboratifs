import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { UserService } from '../user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUserById', 'addUser', 'updateUser']);
    spy.getUserById.and.returnValue(of({ id: 1, name: 'Test User', role: 'MembreEquipe' }));
    spy.addUser.and.returnValue(of({}));
    spy.updateUser.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.userForm.get('name')?.value).toBe('');
    expect(component.userForm.get('role')?.value).toBe('MembreEquipe');
  });

  it('should validate required fields', () => {
    const form = component.userForm;
    expect(form.valid).toBeFalsy();

    form.controls['name'].setValue('Test User');
    expect(form.valid).toBeTruthy();
  });

  it('should call userService.addUser on submit for new user', () => {
    component.userForm.setValue({
      name: 'New User',
      role: 'ChefDeProjet'
    });

    component.onSubmit();
    expect(userServiceSpy.addUser).toHaveBeenCalledWith({
      name: 'New User',
      role: 'ChefDeProjet'
    });
  });
});