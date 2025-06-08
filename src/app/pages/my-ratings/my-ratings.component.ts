import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingService } from '../../services/rating.service';
import { MovieService } from '../../services/movie.service';
import { Auth } from '@angular/fire/auth';
import { Rating } from '../../models/rating.model';
import { Database, ref, remove, update } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-ratings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-ratings.component.html'
})
export class MyRatingsComponent implements OnInit {
  // Id del rating que se esta editando 
  editingId: string | null = null;
  // Comentario editado 
  editComment: string = '';
  // Puntuacion editada 
  editScore: number = 0;

  // Lista de ratings del usuario con informacion de la pelicula
  ratings: (Rating & { id: string, movieTitle?: string, posterPath?: string })[] = [];

  // Servicios y dependencias inyectadas
  constructor(
    private auth: Auth,
    private ratingService: RatingService,
    private movieService: MovieService,
    private db: Database
  ) {}

  // Metodo que se ejecuta al inicializar el componente
  ngOnInit() {
    const user = this.auth.currentUser;
    if (!user) return;

    // Obtiene los ratings del usuario y agrega informacion de la pelicula
    this.ratingService.getRatingsByUserId(user.uid).then(async (ratings) => {
      const results = await Promise.all(ratings.map(async (r) => {
        const movie = await this.movieService.getMovieById(r.movieId.toString()).toPromise();
        return {
          id: r.id,
          comment: r.comment,
          score: r.score,
          movieId: r.movieId,
          userId: r.userId,
          userEmail: r.userEmail,
          timestamp: r.timestamp,
          movieTitle: (movie as any).title,
          posterPath: (movie as any).poster_path
        };
      }));
      this.ratings = results;
    });
  }

  // Inicia el modo de edicion para una valoracion especifica
  startEdit(rating: Rating & { id: string }) {
    this.editingId = rating.id;
    this.editComment = rating.comment;  
    this.editScore = rating.score;
  }

  // Guarda los cambios realizados en un rating
  saveEdit(ratingId: string) {
    const ratingRef = ref(this.db, `ratings/${ratingId}`);
    update(ratingRef, {
      comment: this.editComment,
      score: this.editScore,
      timestamp: Date.now()
    }).then(() => {
      this.editingId = null;
      this.ngOnInit(); 
    });
  }

  // Elimina un rating de la base de datos
  deleteRating(ratingId: string) {
    const ratingRef = ref(this.db, `ratings/${ratingId}`);
    remove(ratingRef).then(() => {
      this.ngOnInit(); 
    });
  }
}
