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
  movie: any = null;

  userEmail: string | null = null;
  newRating: Rating = {
    movieId: 0,
    userId: '',
    userEmail: '',
    comment: '',
    score: 5,
    timestamp: 0
  };
  
  ratings: Rating[] = [];

  constructor(
    private auth: Auth,
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.auth.onAuthStateChanged(user => {
      this.userEmail = user?.email || null;
      this.newRating.userId = user?.uid || '';
      this.newRating.userEmail = user?.email || '';
    });
  }

  submitRating() {
    if (!this.movie) return;

    this.newRating.movieId = this.movie.id;
    this.newRating.timestamp = Date.now();

    this.ratingService.addRating(this.newRating).then(() => {
      this.newRating.comment = '';
      this.loadRatings(this.movie.id);
    });
  }

  loadRatings(movieId: number) {
    this.ratingService.getRatingsForMovie(movieId).then(res => {
    this.ratings = res;
  });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
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
