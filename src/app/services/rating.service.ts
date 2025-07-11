import { Injectable, inject } from '@angular/core';
import { Database, ref, push, set, get, child } from '@angular/fire/database';
import { Rating } from '../models/rating.model';
import { query, orderByChild, equalTo } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  // Inyecta el servicio de Firebase Database
  private db = inject(Database);

  // añade una nueva calificación a la base de datos
  async addRating(rating: Rating) {
    const ratingsRef = ref(this.db, 'ratings');
    const newRef = push(ratingsRef);
    return await set(newRef, rating);
  }

  // Obtiene todas las calificaciones para una pelicula especifica
  async getRatingsForMovie(movieId: number): Promise<Rating[]> {
    const ratingsRef = ref(this.db, 'ratings');
    const snapshot = await get(ratingsRef);
    const data = snapshot.val();
    if (!data) return [];
    return (Object.values(data) as Rating[]).filter((r: Rating) => r.movieId === movieId);
  }

  // Obtiene todas las calificaciones hechas por un usuario
  getRatingsByUserId(userId: string): Promise<(Rating & { id: string })[]> {
  const ratingsRef = ref(this.db, 'ratings');
  const q = query(ratingsRef, orderByChild('userId'), equalTo(userId));

  return get(q).then(snapshot => {
    const data = snapshot.val();
    if (!data) return [];
    return Object.entries(data).map(([key, value]) => ({ ...(value as Rating), id: key }));
  });
}


}
