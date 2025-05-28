export interface TmdbMovieResponse {
  results: any[]; // o crea un tipo `Movie` si prefieres
  page: number;
  total_results: number;
  total_pages: number;
}
