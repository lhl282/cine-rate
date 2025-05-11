import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit {
  movie: any = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(id).subscribe({
        next: (data) => (this.movie = data),
        error: (err) => console.error('Error al cargar detalles:', err)
      });
    }
  }
}
