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
  
  @Input() genres: any[] = [];// Lista de generos disponibles para filtrar
  @Output() filterChanged = new EventEmitter<MovieFilters>();// Evento que se emite cuando cambian los filtros

  // Objeto que contiene los filtros seleccionados
  filters: MovieFilters = {
    query: '',
    genreId: '',
    year: undefined,
    minRating: 0,
    sortBy: 'popularity.desc'
  };

  // Metodo que se ejecuta al inicializar el componente
  ngOnInit() {
    const saved = localStorage.getItem('cineRateFilters');
    if (saved) {
      this.filters = JSON.parse(saved);
      this.filterChanged.emit(this.filters);
    }
  }

  // Limpia todos los filtros y los valores guardados en localStorage
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

  // Metodo que se llama cuando cambia algun filtro
  onFilterChange() {
    localStorage.setItem('cineRateFilters', JSON.stringify(this.filters));
    this.filterChanged.emit(this.filters);
  }
}
