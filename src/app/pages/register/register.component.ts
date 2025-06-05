import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password)
      .then(() => {
        this.success = 'Usuario registrado con éxito';
        this.error = '';
        this.router.navigate(['/']);
      })
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
    case 'auth/wrong-password':
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
