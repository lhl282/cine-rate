import { Injectable, inject } from '@angular/core';
import { Database, ref, push, set, get, child } from '@angular/fire/database';
import { Rating } from '../models/rating.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private db = inject(Database);

  async addRating(rating: Rating) {
    const ratingsRef = ref(this.db, 'ratings');
    const newRef = push(ratingsRef);
    return await set(newRef, rating);
  }

  async getRatingsForMovie(movieId: number): Promise<Rating[]> {
    const ratingsRef = ref(this.db, 'ratings');
    const snapshot = await get(ratingsRef);
    const data = snapshot.val();
    if (!data) return [];
    return (Object.values(data) as Rating[]).filter((r: Rating) => r.movieId === movieId);
  }
}
