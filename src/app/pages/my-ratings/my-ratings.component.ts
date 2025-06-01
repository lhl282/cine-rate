import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingService } from '../../services/rating.service';
import { MovieService } from '../../services/movie.service';
import { Auth } from '@angular/fire/auth';
import { Rating } from '../../models/rating.model';

@Component({
  selector: 'app-my-ratings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-ratings.component.html'
})
export class MyRatingsComponent implements OnInit {
  ratings: (Rating & { movieTitle?: string, posterPath?: string })[] = [];

  constructor(
    private auth: Auth,
    private ratingService: RatingService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const user = this.auth.currentUser;
    console.log('Usuario actual:', user);
    if (!user) return;

    this.ratingService.getRatingsByUserId(user.uid).then(async (ratings) => {
       console.log('Valoraciones encontradas:', ratings);
      const results = await Promise.all(ratings.map(async (r) => {
        const movie = await this.movieService.getMovieById(r.movieId.toString()).toPromise();
        return {
          ...r,
          movieTitle: (movie as any).title,
          posterPath: (movie as any).poster_path
        };
      }));
      this.ratings = results;
    });
  }
}
