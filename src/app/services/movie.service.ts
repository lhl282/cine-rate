import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MovieFilters } from '../models/filters.model';
import { TmdbMovieResponse } from '../models/tmdb-response.model';
import { GenreResponse } from '../models/genre.model';



@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(`${this.baseUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=es-ES&page=1`);
  }

  getMovieById(id: string) {
  return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${environment.tmdbApiKey}&language=es-ES`);
}

  getFilteredMovies(filters: MovieFilters) : Observable<TmdbMovieResponse> {
    let params = new HttpParams()
      .set('api_key', environment.tmdbApiKey)
      .set('language', 'es-ES');

    if (filters.genreId) params = params.set('with_genres', filters.genreId);
    if (filters.year) params = params.set('primary_release_year', filters.year.toString());
    if (filters.minRating !== undefined) params = params.set('vote_average.gte', filters.minRating.toString());
    if (filters.sortBy) params = params.set('sort_by', filters.sortBy);
    if (filters.query) {
      params = params.set('query', filters.query);
      return this.http.get<TmdbMovieResponse>(`${this.baseUrl}/search/movie`, { params });
    } else {
      return this.http.get<TmdbMovieResponse>(`${this.baseUrl}/discover/movie`, { params });
    }
  }

  getGenres() : Observable<GenreResponse>{
    return this.http.get<GenreResponse>(`${this.baseUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=es-ES`);
  }

}
