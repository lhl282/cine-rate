import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=es-ES&page=1`);
  }

  getMovieById(id: string) {
  return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${environment.tmdbApiKey}&language=es-ES`);
}

}
