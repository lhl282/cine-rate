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
  this.movieService.getFilteredMovies(filters).subscribe(res => {
    this.movies = res.results;
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
}
