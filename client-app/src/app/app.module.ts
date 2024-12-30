import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';

import { ProjectService } from './services/project.service';
import { AppRoutingModule } from './app-routing.module';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
