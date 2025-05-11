import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  user: User | null = null;

  constructor(private auth: Auth, private authService: AuthService, private theme: ThemeService) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }
}
