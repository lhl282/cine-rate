import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieFilters } from '../../models/filters.model';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html'
})
export class FiltersComponent {
  @Input() genres: any[] = [];
  @Output() filterChanged = new EventEmitter<MovieFilters>();

  filters: MovieFilters = {
    query: '',
    genreId: '',
    year: undefined,
    minRating: 0,
    sortBy: 'popularity.desc'
  };

  ngOnInit() {
    const saved = localStorage.getItem('cineRateFilters');
    if (saved) {
      this.filters = JSON.parse(saved);
      this.filterChanged.emit(this.filters);
    }
  }

  clearFilters() {
    this.filters = {
      query: '',
      genreId: '',
      year: undefined,
      minRating: 0,
      sortBy: 'popularity.desc'
    };
    localStorage.removeItem('cineRateFilters');
    this.onFilterChange();
  }

  onFilterChange() {
    localStorage.setItem('cineRateFilters', JSON.stringify(this.filters));
    this.filterChanged.emit(this.filters);
  }
}
