import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' }, // Redirection vers les projets par défaut
  { path: 'users', component: UserListComponent },          // Liste des utilisateurs
  { path: 'users/new', component: UserFormComponent },      // Formulaire pour ajouter un utilisateur
  { path: 'users/edit/:id', component: UserFormComponent }, // Formulaire pour modifier un utilisateur
  { path: 'projects', component: ProjectListComponent },    // Liste des projets
  { path: 'projects/new', component: ProjectFormComponent }, // Formulaire pour ajouter un projet
  { path: 'projects/edit/:id', component: ProjectFormComponent }, // Formulaire pour modifier un projet
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
