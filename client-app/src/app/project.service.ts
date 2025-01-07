// project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'https://ton-backend-url/api/projects'; // Remplace par l'URL de ton back-end .NET

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer la liste des projets
  getProjects(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Méthode pour ajouter un projet
  addProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project);
  }

  // Méthode pour éditer un projet
  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, project);
  }

  // Méthode pour supprimer un projet
  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour récupérer un projet par ID
  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
