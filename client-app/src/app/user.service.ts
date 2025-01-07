// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://ton-backend-url/api/users'; // Remplace par l'URL de ton back-end .NET

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer la liste des utilisateurs
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Méthode pour ajouter un utilisateur
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // Méthode pour éditer un utilisateur
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour récupérer un utilisateur par ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
