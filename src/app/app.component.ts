import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPage } from "./pages/login/login.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cine-rate';
}
