export interface MovieFilters {
  query?: string;
  genreId?: string;
  year?: number;
  minRating?: number;
  sortBy?: string;
  page?: number; // 👈 nuevo
}