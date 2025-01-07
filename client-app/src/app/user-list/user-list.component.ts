import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface User {
  id?: number;
  name: string;
  role: 'ChefDeProjet' | 'MembreEquipe';
  badges?: string[];
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  user: User = { name: '', role: 'MembreEquipe' };
  userId: number | null = null;
  isLoading = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      role: ['MembreEquipe', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.loadUser();
    }
  }

  private loadUser(): void {
    this.isLoading = true;
    this.userService.getUserById(this.userId!).subscribe({
      next: (data) => {
        this.user = data;
        this.userForm.patchValue(data);
      },
      error: (error) => {
        this.toastr.error('Erreur lors du chargement de l\'utilisateur');
        console.error('Erreur:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const userData = this.userForm.value;

      const operation = this.userId
        ? this.userService.updateUser(this.userId, userData)
        : this.userService.addUser(userData);

      operation.subscribe({
        next: () => {
          this.toastr.success(
            this.userId 
              ? 'Utilisateur mis à jour avec succès'
              : 'Utilisateur créé avec succès'
          );
          this.router.navigate(['/users']);
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
    this.router.navigate(['/users']);
  }
}