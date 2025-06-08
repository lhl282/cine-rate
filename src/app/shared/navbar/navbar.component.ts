import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  // Usuario autenticado actualmente (null si no hay usuario)
  user: User | null = null;

  // Inyeccion de servicios de autenticacion y manejo de usuario
  constructor(private auth: Auth, private authService: AuthService,) {
    // Se suscribe a los cambios de estado de autenticacion
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  // Metodo para cerrar sesion del usuario
  logout() {
    this.authService.logout();
  }

}
