import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { RouterLink } from '@angular/router';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { MovieFilters } from '../../models/filters.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink, FiltersComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  movies: any[] = []; // Array para almacenar las películas
  genres: any[] = []; // Array para almacenar los géneros de películas

  currentPage = 1; // Página actual para paginación
  totalPages = 1; // Total de páginas disponibles
  lastFilters: MovieFilters = {}; // Últimos filtros aplicados

  // Inyección del servicio MovieService
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Carga películas populares al iniciar
    this.movieService.getPopularMovies().subscribe({
      next: (res) => {
        this.movies = res.results;
      },
      error: (err) => {
        console.error('Error al cargar películas', err);
      }
    });
    this.getGenres();
  this.loadMovies();
  }

  // Aplica filtros a las películas
  applyFilters(filters: MovieFilters) {
  this.currentPage = filters.page ?? 1;
  this.lastFilters = filters;

  this.movieService.getFilteredMovies({ ...filters, page: this.currentPage }).subscribe(res => {
    this.movies = res.results;
    this.totalPages = res.total_pages;
  });
}
  // Obtiene los generos de películas
  getGenres() {
    this.movieService.getGenres().subscribe(res => {
      this.genres = res.genres;
    });
  }

  // Carga las películas
  loadMovies() {
    this.movieService.getPopularMovies().subscribe(res => {
      this.movies = res.results;
    });
  }

  // Métodos para la paginacion
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters({ ...this.lastFilters, page: this.currentPage });
    }
  }
  
  // Métodos para la paginacion
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters({ ...this.lastFilters, page: this.currentPage });
    }
  }
} 
