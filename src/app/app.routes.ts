import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { RegisterComponent } from './pages/register/register.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'movie/:id', component: MovieDetailComponent },
];
