import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  success = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password)
      .then(() => this.router.navigate(['/']))
      .catch(error => {
        this.error = this.getFriendlyError(error.code);
        this.success = '';
      });

  }

  getFriendlyError(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'El correo no tiene un formato válido.';
      case 'auth/missing-password':
        return 'Debes introducir una contraseña.';
      case 'auth/invalid-credential':
        return 'La contraseña es incorrecta.';
      case 'auth/user-not-found':
        return 'No existe una cuenta con ese correo.';
      case 'auth/email-already-in-use':
        return 'Ya hay una cuenta con ese correo.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil (mínimo 6 caracteres).';
      case 'auth/missing-email':
        return 'Debes introducir un correo electrónico.';
      default:
        return 'Ha ocurrido un error. Inténtalo de nuevo.';
    }
  }

}
