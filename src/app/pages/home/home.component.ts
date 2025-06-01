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
  movies: any[] = [];
  genres: any[] = [];

  currentPage = 1;
  totalPages = 1;
  lastFilters: MovieFilters = {};

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
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

  applyFilters(filters: MovieFilters) {
  this.currentPage = filters.page ?? 1;
  this.lastFilters = filters;

  this.movieService.getFilteredMovies({ ...filters, page: this.currentPage }).subscribe(res => {
    this.movies = res.results;
    this.totalPages = res.total_pages;
  });
}

getGenres() {
  this.movieService.getGenres().subscribe(res => {
    this.genres = res.genres;
  });
}

loadMovies() {
  this.movieService.getPopularMovies().subscribe(res => {
    this.movies = res.results;
  });
}


nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.applyFilters({ ...this.lastFilters, page: this.currentPage });
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.applyFilters({ ...this.lastFilters, page: this.currentPage });
  }
}

}
