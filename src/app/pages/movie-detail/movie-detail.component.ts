import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Rating } from '../../models/rating.model';
import { RatingService } from '../../services/rating.service';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit {
  movie: any = null; // Pelicula actual

  userEmail: string | null = null; // Email del usuario logueado (para saludos y comentarios)

  // Objeto para nueva calificacion
  newRating: Rating = {
    movieId: 0,
    userId: '',
    userEmail: '',
    comment: '',
    score: 5,
    timestamp: 0
  }; 
  
  ratings: Rating[] = [];// Lista de calificaciones

  //Sevicios y dependencias inyectadas
  constructor(
    private auth: Auth,
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    // Observador de cambios en la autenticacion
    this.auth.onAuthStateChanged(user => {
      this.userEmail = user?.email || null;
      this.newRating.userId = user?.uid || '';
      this.newRating.userEmail = user?.email || '';
    });
  }

  // Metodo para enviar una nueva calificación
  submitRating() {
    if (!this.movie) return;

    this.newRating.movieId = this.movie.id;
    this.newRating.timestamp = Date.now();

    this.ratingService.addRating(this.newRating).then(() => {
      this.newRating.comment = '';
      this.loadRatings(this.movie.id);
    });
  }

  // Metodo carga las calificaciones para una película
  loadRatings(movieId: number) {
    this.ratingService.getRatingsForMovie(movieId).then(res => {
    this.ratings = res;
  });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtiene el ID de la pelicula de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Obtiene los detalles de la pelicula
      this.movieService.getMovieById(id).subscribe({
        next: (movie) => {
        this.movie = movie;
        this.loadRatings(this.movie.id);
      },
        error: (err) => console.error('Error al cargar detalles:', err)
      });
    }
  }
}
