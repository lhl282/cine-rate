import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = true;

  constructor() {
    this.setTheme(this.darkMode);
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.setTheme(this.darkMode);
  }

  private setTheme(dark: boolean) {
    const html = document.documentElement;
    html.classList.toggle('dark', dark);
  }
}
