import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

const routes: Routes = [
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/create', component: ProjectCreateComponent },
  { path: 'projects/edit/:id', component: ProjectEditComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
