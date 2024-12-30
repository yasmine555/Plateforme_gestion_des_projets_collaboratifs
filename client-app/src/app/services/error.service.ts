import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private snackBar: MatSnackBar) { }

  handleError(error: any, message: string = 'Une erreur est survenue') {
    console.error('Erreur:', error);

    let errorMessage = message;
    if (error.error?.message) {
      errorMessage = error.error.message;
    }

    this.snackBar.open(errorMessage, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
