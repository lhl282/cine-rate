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
  private baseUrl = 'https://api.themoviedb.org/3'; // URL base de la API de TMDB

  constructor(private http: HttpClient) {} // Inyecion HttpClient para hacer peticiones HTTP a la API de TMDB

  // Metodo que obtiene las peliculas populares y las configura para que la informacion se muestre en español
  getPopularMovies(): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>(`${this.baseUrl}/movie/popular?api_key=${environment.tmdbApiKey}&language=es-ES&page=1`);
  }

  // Metodo que obtiene peliculas por ID
  getMovieById(id: string) {
  return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${environment.tmdbApiKey}&language=es-ES`);
}

  // Metodo que obtiene peliculas filtradas por diferentes criterios
  getFilteredMovies(filters: MovieFilters) : Observable<TmdbMovieResponse> {
    //Peticion a la API
    let params = new HttpParams()
      .set('api_key', environment.tmdbApiKey)
      .set('language', 'es-ES');
    
    // Filtros
    if (filters.genreId) params = params.set('with_genres', filters.genreId);
    if (filters.year) params = params.set('primary_release_year', filters.year.toString());
    if (filters.minRating !== undefined) params = params.set('vote_average.gte', filters.minRating.toString());
    if (filters.sortBy) params = params.set('sort_by', filters.sortBy);
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.query) {
      params = params.set('query', filters.query);
      return this.http.get<TmdbMovieResponse>(`${this.baseUrl}/search/movie`, { params });
    } else {
      return this.http.get<TmdbMovieResponse>(`${this.baseUrl}/discover/movie`, { params });
    }
  }

  // Recoge todos los generos de las peliculas
  getGenres() : Observable<GenreResponse>{
    return this.http.get<GenreResponse>(`${this.baseUrl}/genre/movie/list?api_key=${environment.tmdbApiKey}&language=es-ES`);
  }

}
